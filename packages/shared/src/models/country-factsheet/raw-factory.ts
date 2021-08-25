import pick from 'lodash/pick'

import { MappedPlainDestinationCollection } from '@/shared/src/api/destinations/plain-destination'
import { getCountryISOCodes } from '@/shared/src/misc/country-codes'
import {
  FactsheetCountryDocument,
  factsheetDefaults,
  getRawFactsheetFields,
  RawCountryFactsheet,
  RawCountryFactsheetMap,
} from '@/shared/src/models/country-factsheet/raw-country-factsheet'

export function createRawFactsheet(
  countryCode: string,
  document?: FactsheetCountryDocument,
): RawCountryFactsheet {
  return Object.assign(
    { countryCode },
    factsheetDefaults,
    pick(document, getRawFactsheetFields()),
  )
}

export function createRawCountryFactsheetMap(
  rawDestinations: MappedPlainDestinationCollection,
): RawCountryFactsheetMap {
  return Object.fromEntries(
    getCountryISOCodes().map((countryISO) => [
      countryISO,
      createRawFactsheet(countryISO, rawDestinations[countryISO]),
    ]),
  )
}
