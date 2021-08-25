import { MappedPlainDestinationCollection } from '@/shared/src/api/destinations/plain-destination'
import { getCountryISOCodes } from '@/shared/src/misc/country-codes'
import { createRawPrecomputedRestriction } from '@/shared/src/models/precomputed-restriction/factory'
import { RoundTripRawPrecomputedRestrictionMap } from '@/shared/src/models/precomputed-restriction/raw-precomputed-restriction'
import { createProfileContext } from '@/shared/src/models/profile-context/helper'
import { ProfileContext } from '@/shared/src/models/profile-context/profile-context'
import { convertIncompleteTreeFromStorageFormat } from '@/shared/src/restriction-tree/converter'
import {
  createRestrictionGroupCollection,
  RestrictionGroup,
} from '@/shared/src/restriction-tree/restriction-group'

export function createOverviewCollection(
  context: Partial<ProfileContext>,
  rawDestinations: MappedPlainDestinationCollection,
): RoundTripRawPrecomputedRestrictionMap {
  const outgoingContext = createProfileContext(context)

  const origin = rawDestinations[outgoingContext.origin]
  const originRestrictionTree = convertIncompleteTreeFromStorageFormat(
    origin ? origin.restrictionTree ?? [] : [],
  )

  const result: RoundTripRawPrecomputedRestrictionMap = {}

  for (const countryISO of getCountryISOCodes()) {
    if (countryISO === context.origin) {
      continue
    }

    const destination = rawDestinations[countryISO]
    const outgoingTrip =
      createRestrictionGroupCollection(
        convertIncompleteTreeFromStorageFormat(
          destination ? destination.restrictionTree : [],
        ),
        outgoingContext,
      ).getBestGroup() ?? new RestrictionGroup()

    const returnContext = createProfileContext({
      origin: countryISO,
      ...context,
    })

    const returnTrip =
      createRestrictionGroupCollection(
        originRestrictionTree,
        returnContext,
      ).getBestGroup() ?? new RestrictionGroup()

    result[countryISO] = {
      outgoing: createRawPrecomputedRestriction(outgoingTrip),
      return: createRawPrecomputedRestriction(returnTrip),
    }
  }

  return result
}
