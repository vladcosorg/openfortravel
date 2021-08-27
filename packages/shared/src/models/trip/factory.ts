import { getCountryISOCodes } from '@/shared/src/misc/country-codes'
import {
  CountryFactsheet,
  MappedCountryFactsheetCollection,
} from '@/shared/src/models/country-factsheet/country-factsheet'
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
  countryFactsheetCollection: MappedCountryFactsheetCollection = {},
): RoundTripCollection {
  return getCountryISOCodes(originISO).map((destinationISO) => {
    const originFactsheet =
      countryFactsheetCollection[originISO] ??
      CountryFactsheet.createDummy(originISO)
    const destinationFactsheet =
      countryFactsheetCollection[destinationISO] ??
      CountryFactsheet.createDummy(destinationISO)

    return new RoundTrip(
      new OneWayTrip(
        originFactsheet,
        destinationFactsheet,
        createPrecomputedRestriction(restrictions[destinationISO].outgoing),
      ),
      new OneWayTrip(
        destinationFactsheet,
        originFactsheet,
        createPrecomputedRestriction(restrictions[destinationISO].return),
      ),
    )
  })
}
