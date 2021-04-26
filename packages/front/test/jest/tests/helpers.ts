import countries from 'i18n-iso-countries/langs/en.json'

import {
  createCountryListEntry,
  RawLocalizedCountryList,
} from '@/shared/src/modules/country-list/country-list-node-preload'

export function getCountryList(): Record<string, string> {
  return createCountryListEntry((countries as unknown) as RawLocalizedCountryList).origin
}
