import debounce from 'lodash/debounce'
import { ComputedRef, ref, watch } from 'vue'

import { OneWayTripCard } from '@/front/src/models/one-way-trip-card'
import { RoundTripCard } from '@/front/src/models/round-trip-card'
import { Destination } from '@/shared/src/api/destinations/models'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

export function createTripsCards(): ComputedRef<RoundTripCard[]> {
  const store = useRootStore()
  const results = ref<RoundTripCard[]>([])
  const countries = store.getters.wrappedHostRules
  const debounced = debounce((context) => {
    const originCountry = countries[context[RestrictionNodeType.ORIGIN]]
    results.value = Object.values(countries)
      .filter((destinationCountry) => !destinationCountry.equals(originCountry))
      .map(
        (destinationCountry) =>
          new RoundTripCard(
            new OneWayTripCard(originCountry, destinationCountry, context),
            new OneWayTripCard(destinationCountry, originCountry, context),
          ),
      )
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

export function createOneWayTripCard(
  originCountry: Destination,
  destinationCountry: Destination,
  profile: VisitorProfile,
): OneWayTripCard {
  return new OneWayTripCard(originCountry, destinationCountry, profile)
}

export function createRoundTripCard(
  origin: Destination,
  destination: Destination,
  profile: VisitorProfile,
): RoundTripCard {
  return new RoundTripCard(
    createOneWayTripCard(origin, destination, profile),
    createOneWayTripCard(destination, origin, profile),
  )
}
