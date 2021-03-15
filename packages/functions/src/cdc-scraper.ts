import firebase from 'firebase-admin'
import * as functions from 'firebase-functions'
import ky from 'ky-universal'
import { deburr, find } from 'lodash'
import scrapeIt from 'scrape-it'

export const safetyLevelCalculatorJob = functions.pubsub
  .schedule('every 48 hours')
  .onRun(async () => {
    await runScraper()
    return
  })

async function runScraper(): Promise<void> {
  const finder = await loadCountryPopulations()
  const data = await scrapeIt<{
    countries: {
      level: string
      countries: string[]
    }[]
  }>('https://www.cdc.gov/coronavirus/2019-ncov/travelers/map-and-travel-notices.html', {
    countries: {
      listItem: ".syndicate .row div[class^='ral'] .card",
      data: {
        level: {
          selector: '.card-header',
          convert: (header: string) => {
            const matches = header.match(/Level (\d)/)
            let level = 0
            if (matches && matches[1]) {
              level = Number.parseInt(matches[1], 10)
            }

            switch (level) {
              case 4:
                return 'very-high'
              case 3:
                return 'high'

              case 2:
                return 'moderate'

              case 1:
                return 'low'

              default:
                return 'no-data'
            }
          },
        },
        countries: {
          listItem: 'li > a',
          convert: (country) => {
            const replacement = finder(country)
            if (!replacement) {
              return
            }

            return replacement
          },
        },
      },
    },
  })
  const recordsSet: Record<string, string> = {}

  data.data.countries.forEach(({ level, countries }) => {
    for (const countryCode of countries) {
      if (!countryCode) {
        continue
      }

      recordsSet[countryCode] = level
    }
  })

  await persistToFirestore(recordsSet)
}

type Country = {
  name: string
  nativeName: string
  altSpellings: string[]
  population: number
  alpha2Code: string
}
async function loadCountryPopulations(): Promise<(countryEnName: string) => string> {
  const countryLibrary = await ky.get('https://restcountries.eu/rest/v2/').json<Country[]>()

  const transformationMap: Record<string, string> = {
    'Bahamas, The': 'bs',
    'Burma (Myanmar)': 'mm',
    'Cape Verde': 'cv',
    'Congo, Republic of the': 'cg',
    'Democratic Republic of the Congo': 'cd',
    'Easter Island': '',
    'Eswatini (Swaziland)': 'sz',
    'French Polynesia)': 'pf',
    'Gambia, The': 'gm',
    'Guam (U.S.)': 'gu',
    Iran: 'ir',
    'Israel, including the West Bank and Gaza': 'il',
    'Jersey (part of the UK)': 'je',
    Kosovo: 'xk',
    'Martinique (France)': 'mq',
    'Mayotte (France)': 'yt',
    'Netherlands, The': 'nl',
    'North Korea': 'kp',
    'North Macedonia': 'mk',
    'Pitcairn Islands (U.K.)': 'pn',
    'Puerto Rico (U.S.)': 'pr',
    Russia: 'ru',
    'Saint Martin': 'mf',
    Syria: 'sy',
    'Virgin Islands, U.S.': 'vi',
    'Hong Kong SAR': 'hk',
    'South Korea': 'kr',
    'Turks and Caicos Islands (U.K.)': 'tc',
    Brunei: 'bn',
    'Macau SAR': 'mo',
    'Micronesia, Federated States of': 'fm',
    Saba: 'bq',
    'Sint Eustatius': 'bq',
    'Timor-Leste (East Timor)': 'tl',
    Vietnam: 'vn',
    'Canary Islands': 'ic',
    'Wake Island': 'um',
  }

  return function (countryEnName: string): string {
    const foundCountry = find(countryLibrary, (item) => {
      if (item.name === countryEnName || item.nativeName === countryEnName) {
        return true
      }

      const latinizedName = deburr(item.name)
      if (latinizedName === countryEnName) {
        return true
      }

      if (item.altSpellings.includes(countryEnName)) {
        return true
      }

      return item.altSpellings.map((spelling) => deburr(spelling)).includes(countryEnName)
    })

    return foundCountry
      ? foundCountry.alpha2Code.toLowerCase()
      : transformationMap[countryEnName]
  }
}

async function persistToFirestore(input: Record<string, string>) {
  const firestore = firebase.firestore()
  const collection = firestore.collection('countries')

  const batch = firestore.batch()
  for (const [code, value] of Object.entries(input)) {
    // eslint-disable-next-line no-console
    console.log(`Added ${code} with value ${value}`)
    batch.set(
      collection.doc(code),
      { riskLevel: value },
      {
        merge: true,
      },
    )
  }

  await batch.commit()
}
