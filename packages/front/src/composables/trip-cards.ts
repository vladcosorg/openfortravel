import { Destination } from '@/shared/src/api/destinations/models'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import {
  RestrictionGroup,
  RestrictionGroupCollection,
} from '@/shared/src/restriction-tree/restriction-group'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'
import debounce from 'lodash/debounce'
import { ref, watch } from 'vue'
import type { ComputedRef } from 'vue'

import { TripCard } from '@/front/src/models/TripCard'

export function createTripsCards(
  includeReturnData = false,
): ComputedRef<TripCard[]> {
  const store = useRootStore()
  const results = ref<TripCard[]>([])
  const countries = store.getters.wrappedHostRules
  const debounced = debounce((context) => {
    const originCountry = countries[context[RestrictionNodeType.ORIGIN]]
    results.value = Object.values(countries)
      .filter((destinationCountry) => !destinationCountry.equals(originCountry))
      .map((destinationCountry) => {
        const optimalGroup = createCollection(
          destinationCountry,
          context,
        ).getBestGroup()

        return new TripCard(
          originCountry,
          destinationCountry,
          optimalGroup ?? new RestrictionGroup(),
          includeReturnData
            ? createCollection(originCountry, context, true).getBestGroup() ??
              new RestrictionGroup()
            : undefined,
        )
      })
  }, 100)

  watch(
    () => store.getters.visitorContextWithDefaults,
    (context) => {
      results.value = []
      debounced(context)
    },
    { immediate: true },
  )

  return results
}

export function createTripCard(
  originCountry: Destination,
  destinationCountry: Destination,
  profile: VisitorProfile,
): TripCard {
  const collection = new RestrictionGroupCollection(
    originCountry.restrictions,
    profile,
  )

  return new TripCard(
    originCountry,
    destinationCountry,
    collection.getBestGroup() ?? new RestrictionGroup(),
  )
}

export function createCollection(
  country: Destination,
  profile: VisitorProfile,
  inverseOrigin = false,
): RestrictionGroupCollection {
  return new RestrictionGroupCollection(
    country.restrictions,
    inverseOrigin
      ? Object.assign({}, profile, {
          [RestrictionNodeType.ORIGIN]: country.countryCode,
        })
      : profile,
  )
}
