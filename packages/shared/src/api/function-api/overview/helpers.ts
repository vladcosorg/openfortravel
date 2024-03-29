import mapValues from 'lodash/mapValues'

import { MappedPlainDestinationCollection } from '@/shared/src/api/destinations/plain-destination'
import { RoundTripEncodedRestriction } from '@/shared/src/api/function-api/overview-raw/model'
import { RoundTripRestrictionGroup } from '@/shared/src/api/function-api/overview/model'
import { getCountryISOCodes } from '@/shared/src/misc/country-codes'
import { createRawPrecomputedRestriction } from '@/shared/src/models/precomputed-restriction/factory'
import { RoundTripRawPrecomputedRestrictionMap } from '@/shared/src/models/precomputed-restriction/raw-precomputed-restriction'
import { createProfileContext } from '@/shared/src/models/profile-context/helper'
import { ProfileContext } from '@/shared/src/models/profile-context/profile-context'
import { convertIncompleteTreeFromStorageFormat } from '@/shared/src/restriction-tree/converter'
import {
  createGroupFromEncodedNodeGroup,
  createRestrictionGroupCollection,
  RestrictionGroup,
} from '@/shared/src/restriction-tree/restriction-group'

export function createRawOverviewCollection(
  context: Partial<ProfileContext>,
  rawDestinations: MappedPlainDestinationCollection,
): RoundTripRawPrecomputedRestrictionMap {
  const outgoingContext = createProfileContext(context)
  const returningDestination = rawDestinations[outgoingContext.origin]
  const returningDestinationRestrictions =
    convertIncompleteTreeFromStorageFormat(
      returningDestination ? returningDestination.restrictionTree ?? [] : [],
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

    const returnTrip =
      createRestrictionGroupCollection(
        returningDestinationRestrictions,
        createProfileContext({
          origin: countryISO,
          ...context,
        }),
      ).getBestGroup() ?? new RestrictionGroup()

    result[countryISO] = {
      outgoing: createRawPrecomputedRestriction(outgoingTrip),
      return: createRawPrecomputedRestriction(returnTrip),
    }
  }

  return result
}

export function createOverviewCollection(
  rawCollection: Record<string, RoundTripEncodedRestriction>,
): Record<string, RoundTripRestrictionGroup> {
  return mapValues(rawCollection, (roundtrip) =>
    mapValues(roundtrip, (trip) => createGroupFromEncodedNodeGroup(trip)),
  )
}
