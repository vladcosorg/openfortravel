import { computed } from 'vue'

import { updateRouteParameter } from '@/front/src/router/route-builders/common'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeTypeValue } from '@/shared/src/restriction-tree/matcher'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export function useModel() {
  const store = useRootStore()
  return computed<
    RestrictionNodeTypeValue<RestrictionNodeType.DID_NOT_VISIT_COUNTRIES>
  >({
    get() {
      return (
        store.state.visitorContext[
          RestrictionNodeType.DID_NOT_VISIT_COUNTRIES
        ] ?? []
      )
    },
    set(value) {
      updateRouteParameter('visited', value)
    },
  })
}
