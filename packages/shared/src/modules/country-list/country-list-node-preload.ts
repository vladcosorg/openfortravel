import { invert, mapValues } from 'lodash-es'
import { Locale } from 'vue-i18n'

import {
  convertCountryNameToSlug,
  CountryListTypes,
  loadCountryListForLocale,
} from '@/shared/src/modules/country-list/country-list-store'
import { LocaleList } from '@/shared/src/modules/language/locales'

export async function generateCountryCodeToLabelList(
  availableLocales: LocaleList,
): Promise<Record<Locale, CountryListTypes>> {
  const output: Record<Locale, CountryListTypes> = {}
  for (const locale of availableLocales) {
    output[locale] = await loadCountryListForLocale(locale)
  }
  return output
}

export async function generateCountryCodeToSlugList(
  availableLocales: LocaleList,
): Promise<Record<Locale, CountryListTypes>> {
  const output: Record<Locale, CountryListTypes> = {}
  for (const locale of availableLocales) {
    const countryList = await loadCountryListForLocale(locale)

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

export async function generateCountrySlugToCodeList(
  availableLocales: LocaleList,
): Promise<Record<Locale, CountryListTypes>> {
  const output: Record<Locale, CountryListTypes> = {}
  for (const locale of availableLocales) {
    const countryList = await loadCountryListForLocale(locale)

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
