import firebase from 'firebase-admin'
import ky from 'ky-universal'
import { find, deburr, pickBy, mapValues } from 'lodash'

type Records = Record<string, number>

const regionMappings: Record<string, string> = {
  'St Martin': 'Saint-Martin',
  Macau: 'Macao',
}

type Country = {
  name: string
  nativeName: string
  altSpellings: string[]
  population: number
  alpha2Code: string
}

let countryLibrary: Country[]
firebase.initializeApp()

export async function recalculateSafetyLevels(): Promise<void> {
  const output: Record<string, number> = {}

  const historicalData = await loadHistoricCaseData()

  for (const country of Object.values(historicalData)) {
    for (const [region, { dates, population, abbreviation }] of Object.entries(
      country,
    )) {
      const mappedRegion = regionMappings[region] ?? region
      const indexedDates = Object.values(dates)

      if (region === 'All') {
        if (!abbreviation) {
          continue
        }

        addSafetyIndexRecord(
          {
            population: population,
            todayCases: indexedDates[0],
            pastCases: indexedDates[6],
            countryISO: abbreviation.toLowerCase(),
          },
          output,
        )
      } else {
        const foundCountry = await findMissingCountryData(mappedRegion)
        if (foundCountry) {
          addSafetyIndexRecord(
            {
              population: foundCountry['population'],
              todayCases: indexedDates[0],
              pastCases: indexedDates[6],
              countryISO: foundCountry['alpha2Code'].toLowerCase(),
            },
            output,
          )
        }
      }
    }
  }

  const normalizedSeries = normalizeValues(output)
  await persistToFirestore(normalizedSeries)
}

async function persistToFirestore(input: Records) {
  const firestore = firebase.firestore()
  const collection = firestore.collection('countries')

  const batch = firestore.batch()
  for (const [code, value] of Object.entries(input)) {
    // eslint-disable-next-line no-console
    console.log(`Added ${code} with value ${value}`)
    batch.set(
      collection.doc(code),
      { safetyLevel: value },
      {
        merge: true,
      },
    )
  }

  await batch.commit()
}

async function findMissingCountryData(
  region: string,
): Promise<Country | undefined> {
  const countryLibrary = await loadCountryPopulations()
  return find(countryLibrary, (item) => {
    if (item.name === region || item.nativeName === region) {
      return true
    }

    const latinizedName = deburr(item.name)
    if (latinizedName === region) {
      return true
    }

    if (item.altSpellings.includes(region)) {
      return true
    }

    return item.altSpellings
      .map((spelling) => deburr(spelling))
      .includes(region)
  })
}

function normalizeValues(valueSeries: Records): Records {
  return (pickBy(
    mapValues(valueSeries, (value) => {
      if (value > 200) {
        return 'very-high'
      }

      if (value > 100) {
        return 'very-high'
      }

      if (value > 10) {
        return 'moderate'
      }

      if (value > 0.2) {
        return 'low'
      }

      return
    }),
  ) as unknown) as Records
}

function addSafetyIndexRecord(
  {
    population,
    todayCases,
    pastCases,
    countryISO,
  }: {
    population: number
    todayCases: number
    pastCases: number
    countryISO: string
  },
  records: Records,
): void {
  const weekIncreaseOfCases = todayCases - pastCases
  const value = (weekIncreaseOfCases / population) * 100_000
  if (value > 0) {
    records[countryISO] = value
  }
}

async function loadCountryPopulations(): Promise<Country[]> {
  if (!countryLibrary) {
    countryLibrary = await ky.get('https://restcountries.eu/rest/v2/').json()
  }

  return countryLibrary
}

async function loadHistoricCaseData(): Promise<
  Record<
    string,
    Record<
      string,
      {
        population: number
        abbreviation: string
        dates: Record<string, number>
        country: string
      }
    >
  >
> {
  return await ky
    .get('https://covid-api.mmediagroup.fr/v1/history?status=confirmed')
    .json()
}
