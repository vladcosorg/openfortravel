import { getCountryISOCodes } from '@/shared/src/misc/country-codes'
import { MappedCountryFactsheetCollection } from '@/shared/src/models/country-factsheet/country-factsheet'
import { createPrecomputedRestriction } from '@/shared/src/models/precomputed-restriction/factory'
import { RoundTripRawPrecomputedRestrictionMap } from '@/shared/src/models/precomputed-restriction/raw-precomputed-restriction'
import { OneWayTrip } from '@/shared/src/models/trip/one-way-trip'
import {
  RoundTrip,
  RoundTripCollection,
} from '@/shared/src/models/trip/round-trip'

export function createRoundTripCollectionFromRawRestrictions(
  originISO: string,
  restrictions: RoundTripRawPrecomputedRestrictionMap,
  countryFactsheetCollection: MappedCountryFactsheetCollection,
): RoundTripCollection {
  return getCountryISOCodes(originISO).map(
    (destinationISO) =>
      new RoundTrip(
        new OneWayTrip(
          countryFactsheetCollection[originISO],
          countryFactsheetCollection[destinationISO],
          createPrecomputedRestriction(restrictions[destinationISO].outgoing),
        ),
        new OneWayTrip(
          countryFactsheetCollection[originISO],
          countryFactsheetCollection[destinationISO],
          createPrecomputedRestriction(restrictions[destinationISO].return),
        ),
      ),
  )
}
