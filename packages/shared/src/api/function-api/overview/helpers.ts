import mapValues from 'lodash/mapValues'
import pickBy from 'lodash/pickBy'

import { MappedPlainDestinationCollection } from '@/shared/src/api/destinations/plain-destination'
import {
  OneWayOverview,
  RoundTripOverviewCollection,
} from '@/shared/src/api/function-api/overview/index'
import { convertIncompleteTreeFromStorageFormat } from '@/shared/src/restriction-tree/converter'
import {
  createRestrictionGroupCollection,
  RestrictionGroup,
} from '@/shared/src/restriction-tree/restriction-group'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

export function createOverviewCollection(
  context: VisitorProfile,
  rawDestinations: MappedPlainDestinationCollection,
): RoundTripOverviewCollection {
  const origin = rawDestinations[context.origin]
  const originRestrictionTree = convertIncompleteTreeFromStorageFormat(
    origin.restrictionTree,
  )

  const outgoingContext = {
    origin: origin.countryCode,
    citizenship: ['md'],
    [RestrictionNodeType.DID_NOT_VISIT_COUNTRIES]: [],
  }

  return pickBy(
    mapValues(rawDestinations, (destination) => {
      const outgoingTrip =
        createRestrictionGroupCollection(
          convertIncompleteTreeFromStorageFormat(destination.restrictionTree),
          outgoingContext,
        ).getBestGroup() ?? new RestrictionGroup()

      const returnContext = {
        origin: destination.countryCode,
        citizenship: ['md'],
        [RestrictionNodeType.DID_NOT_VISIT_COUNTRIES]: [],
      }

      const returnTrip =
        createRestrictionGroupCollection(
          originRestrictionTree,
          returnContext,
        ).getBestGroup() ?? new RestrictionGroup()

      if (!outgoingTrip) {
        return
      }

      return {
        outgoing: createGroup(outgoingTrip),
        return: createGroup(returnTrip),
      }
    }),
    (v) => v !== undefined,
  ) as RoundTripOverviewCollection
}

const createGroup = (group: RestrictionGroup): OneWayOverview => ({
  quarantine: group.quarantineRequired,
  pcrTest: group.pcrTestRequired,
  rating: group.rating,
  status: group.status,
})
