import { invert, mapValues } from 'lodash'
import { Locale } from 'vue-i18n'

import { importAll } from '@/front/src/misc/misc'
import { CountryList } from '@/shared/src/modules/country-list/country-list-helpers'
import {
  convertCountryListResponseToCountryLabelMap,
  convertCountryNameToSlug,
  CountryListTypes,
} from '@/shared/src/modules/country-list/country-list-store'

type CountryListCollection = Record<string, CountryListTypes>
export function preloadCountryList(): CountryListCollection {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const context = (require as any).context(
    'i18n-iso-countries/langs/',
    true,
    /\.json$/,
  )
  const content = importAll<
    Array<{
      locale: string
      countries: CountryList
    }>
  >(context)
  const output: CountryListCollection = {}

  for (const list of content) {
    if (list.locale === 'ru') {
      output[list.locale] = {
        origin: require('@/shared/src/i18n/declensions-ru/origin.json'),
        destination: require('@/shared/src/i18n/declensions-ru/destination.json'),
      }
    } else {
      const processedList = convertCountryListResponseToCountryLabelMap(
        list.countries,
      )
      output[list.locale] = {
        origin: processedList,
        destination: processedList,
      }
    }
  }
  return output
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
    output[locale] = {
      origin: invert(
        mapValues(countryList.origin, (value) =>
          convertCountryNameToSlug(value),
        ),
      ),

      destination: invert(
        mapValues(countryList.destination, (value) =>
          convertCountryNameToSlug(value),
        ),
      ),
    }
  }
  return output
}
