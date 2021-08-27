import groupBy from 'lodash/groupBy'

import {
  statCategory,
  TripsGroupedByStatCategory,
} from '@/front/src/modules/stats/model'
import { RoundTripCollection } from '@/shared/src/models/trip/round-trip'

export function groupTripsByCategory(
  allTrips: RoundTripCollection,
): TripsGroupedByStatCategory {
  return Object.assign(
    Object.fromEntries(statCategory.map((group) => [group, undefined])),
    groupBy(allTrips, (roundTrip) => {
      if (roundTrip.outgoing.restrictions.isForbidden) {
        return 'forbidden'
      }

      if (roundTrip.outgoing.restrictions.quarantine) {
        return 'quarantine'
      }

      if (roundTrip.outgoing.restrictions.pcrTest) {
        return 'test'
      }

      return 'open'
    }) as unknown as TripsGroupedByStatCategory,
  )
}
