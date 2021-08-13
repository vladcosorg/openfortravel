import { useRootStore } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeTypeValue } from '@/shared/src/restriction-tree/matcher'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { computed } from 'vue'

import { updateRouteParameter } from '@/front/src/router/route-builders/common'

export function useModel() {
  const store = useRootStore()
  return computed<RestrictionNodeTypeValue<RestrictionNodeType.CITIZENSHIP>>({
    get() {
      return store.getters.visitorContextWithDefaults[
        RestrictionNodeType.CITIZENSHIP
      ]
    },
    set(value) {
      updateRouteParameter(RestrictionNodeType.CITIZENSHIP, value)
    },
  })
}
