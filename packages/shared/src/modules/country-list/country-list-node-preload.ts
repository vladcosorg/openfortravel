import invert from 'lodash/invert'
import mapValues from 'lodash/mapValues'

import { importAll } from '@/front/src/misc/misc'
import list from '@/shared/src/i18n/declensions-ru/origin.json'
import type { CountryList } from '@/shared/src/modules/country-list/country-list-helpers'
import type { CountryListTypes } from '@/shared/src/modules/country-list/country-list-store'
import {
  convertCountryListResponseToCountryLabelMap,
  convertCountryNameToSlug,
} from '@/shared/src/modules/country-list/country-list-store'

import type { Locale } from 'vue-i18n'

export type RawLocalizedCountryList = {
  locale: string
  countries: CountryList
}
type CountryListCollection = Record<string, CountryListTypes>
export function preloadCountryList(): CountryListCollection {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const context = (require as any).context(
    'i18n-iso-countries/langs/',
    true,
    /\.json$/,
  )
  const content = importAll<RawLocalizedCountryList[]>(context)
  const output: CountryListCollection = {}

  for (const list of content) {
    if (list.locale === 'ru') {
      output[list.locale] = {
        origin: require('@/shared/src/i18n/declensions-ru/origin.json'),
        destination: require('@/shared/src/i18n/declensions-ru/destination.json'),
      }
    } else {
      output[list.locale] = createCountryListEntry(list)
    }
  }
  return output
}

export function extractCountryCodes(): string[] {
  return Object.keys(list)
}

export function createCountryListEntry(
  list: RawLocalizedCountryList,
): CountryListTypes {
  const processedList = convertCountryListResponseToCountryLabelMap(
    list.countries,
  )
  return {
    origin: processedList,
    destination: processedList,
  }
}

export function generateCountryCodeToSlugList(
  collection: CountryListCollection,
): CountryListCollection {
  const output: Record<Locale, CountryListTypes> = {}
  for (const [locale, countryList] of Object.entries(collection)) {
    output[locale] = {
      origin: mapValues(countryList.origin, (value) =>
        convertCountryNameToSlug(value),
      ),

      destination: mapValues(countryList.destination, (value) =>
        convertCountryNameToSlug(value),
      ),
    }
  }
  return output
}

export function generateCountrySlugToCodeList(
  collection: CountryListCollection,
): CountryListCollection {
  const output: Record<Locale, CountryListTypes> = {}
  for (const [locale, countryList] of Object.entries(collection)) {
    output[locale] = createSlugListEntry(countryList)
  }
  return output
}

export function createSlugListEntry(
  countryList: CountryListTypes,
): CountryListTypes {
  return {
    origin: invert(
      mapValues(countryList.origin, (value) => convertCountryNameToSlug(value)),
    ),

    destination: invert(
      mapValues(countryList.destination, (value) =>
        convertCountryNameToSlug(value),
      ),
    ),
  }
}
