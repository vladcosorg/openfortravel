import mapValues from 'lodash/mapValues'

import {
  CountryFactsheet,
  MappedCountryFactsheetCollection,
} from '@/shared/src/models/country-factsheet/country-factsheet'
import {
  RawCountryFactsheet,
  RawCountryFactsheetMap,
} from '@/shared/src/models/country-factsheet/raw-country-factsheet'

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
