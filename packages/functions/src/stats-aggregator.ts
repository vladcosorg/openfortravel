import firebase from 'firebase-admin'
import * as functions from 'firebase-functions'
import ky from 'ky-universal'
import { find, deburr } from 'lodash'

type RecordItem = { thisWeekCasesPer100K?: number; lastWeekCasesPer100K?: number }
type Records = Record<string, RecordItem>

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

export const statsAggregatorJob = functions.pubsub
  .schedule('every 168 hours')
  .onRun(async () => {
    await loadStats()
    return
  })

async function loadStats(): Promise<void> {
  const output: Records = {}

  const historicalData = await loadHistoricCaseData()

  for (const country of Object.values(historicalData)) {
    for (const [region, { dates, population, abbreviation }] of Object.entries(country)) {
      const mappedRegion = regionMappings[region] ?? region
      const indexedDates = Object.values(dates)

      if (region === 'All') {
        if (!abbreviation) {
          continue
        }

        addSafetyIndexRecord(
          {
            population: population,
            todayCases: indexedDates[0] - indexedDates[6],
            pastCases: indexedDates[6] - indexedDates[12],
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
              todayCases: indexedDates[0] - indexedDates[6],
              pastCases: indexedDates[6] - indexedDates[12],
              countryISO: foundCountry['alpha2Code'].toLowerCase(),
            },
            output,
          )
        }
      }
    }
  }

  await persistToFirestore(output)
}

async function persistToFirestore(input: Records) {
  const firestore = firebase.firestore()
  const collection = firestore.collection('countries')

  for (const [code, value] of Object.entries(input)) {
    // eslint-disable-next-line no-console

    try {
      await collection.doc(code).update(value)
      // eslint-disable-next-line no-console
      console.log(`Updated stats for ${code}`)
    } catch {
      // eslint-disable-next-line no-console
      console.log(`Update for ${code} failed`)
    }
  }
}

async function findMissingCountryData(region: string): Promise<Country | undefined> {
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

    return item.altSpellings.map((spelling) => deburr(spelling)).includes(region)
  })
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
  const value = (todayCases / population) * 100_000
  const res: RecordItem = {}
  if (value > 0) {
    res['thisWeekCasesPer100K'] = value
  }

  const oldCases = (pastCases / population) * 100_000
  if (oldCases > 0) {
    res['lastWeekCasesPer100K'] = oldCases
  }
  records[countryISO] = res
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
  return await ky.get('https://covid-api.mmediagroup.fr/v1/history?status=confirmed').json()
}
