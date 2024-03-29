import { computed } from 'vue'

import { updateRouteParameter } from '@/front/src/router/route-builders/common'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export function useModel() {
  const store = useRootStore()
  return computed({
    get() {
      return store.getters.visitorContextWithDefaults[
        RestrictionNodeType.RECOVERY
      ]
    },
    set(value) {
      updateRouteParameter('recovered', value)
    },
  })
}
