import type { ComputedRef } from '@vue/composition-api'
import { computed } from '@vue/composition-api'

import { RoundTrip } from '@/front/src/models/RoundTrip'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import {
  RestrictionGroup,
  RestrictionGroupCollection,
} from '@/shared/src/restriction-tree/restriction-group'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export function buildTripsFromProfileOrigin(
  includeReturnData = false,
): ComputedRef<RoundTrip[]> {
  const store = useRootStore()
  return computed<RoundTrip[]>(() => {
    const countries = store.getters.wrappedHostRules
    const context = store.state.visitorContext

    const originCountry = countries[context[RestrictionNodeType.ORIGIN]]
    return Object.values(countries).map((destinationCountry) => {
      const optimalGroup = new RestrictionGroupCollection(
        destinationCountry.restrictions,
        context,
      ).getBestGroup()

      const returnOptimalGroup = new RestrictionGroupCollection(
        originCountry.restrictions,
        Object.assign({}, context, {
          [RestrictionNodeType.ORIGIN]: destinationCountry.countryCode,
        }),
      ).getBestGroup()

      return new RoundTrip(
        originCountry,
        destinationCountry,
        optimalGroup ?? new RestrictionGroup(),
        returnOptimalGroup ?? new RestrictionGroup(),
      )
    })
  })
}
