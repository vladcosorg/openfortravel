import mapValues from 'lodash/mapValues'
import pick from 'lodash/pick'

import { MappedPlainDestinationCollection } from '@/shared/src/api/destinations/plain-destination'
import { getCountryISOCodes } from '@/shared/src/misc/country-codes'
import {
  CountryFactsheet,
  MappedCountryFactsheetCollection,
} from '@/shared/src/models/country-factsheet/country-factsheet'
import {
  FactsheetCountryDocument,
  factsheetDefaults,
  getRawFactsheetFields,
  RawCountryFactsheetMap,
  RawCountryFactsheet,
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

function createCountryFactsheet(
  plainFactsheet: RawCountryFactsheet,
): CountryFactsheet {
  return new CountryFactsheet(plainFactsheet)
}

export function createCountryFactsheetCollection(
  collection?: RawCountryFactsheetMap,
): MappedCountryFactsheetCollection {
  return mapValues(collection, (plainFactsheet) =>
    createCountryFactsheet(plainFactsheet),
  )
}
