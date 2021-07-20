import { computed } from 'vue'

import { updateRouteParameter } from '@/front/src/router/route-builders/common'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { VaccineBrand } from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export function useModel() {
  const store = useRootStore()
  return computed({
    get() {
      return (
        store.getters.visitorContextWithDefaults[RestrictionNodeType.VACCINATED]
          ?.brand ?? false
      )
    },
    set(value: false | VaccineBrand) {
      updateRouteParameter(
        RestrictionNodeType.VACCINATED,
        value === false
          ? undefined
          : {
              partial: false,
              brand: value,
            },
      )
    },
  })
}
