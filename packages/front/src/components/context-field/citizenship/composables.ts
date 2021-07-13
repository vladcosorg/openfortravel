import { computed } from '@vue/composition-api'

import { createComputedSetter } from '@/front/src/pages/guide/guide-composable'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export function useModel(withDefaults = false) {
  const setter = createComputedSetter(
    RestrictionNodeType.CITIZENSHIP,
    withDefaults,
  )
  return computed<typeof setter.value>({
    get() {
      return setter.value ?? []
    },
    set(value) {
      if (!value) {
        setter.value = undefined
        return
      }

      setter.value = value
    },
  })
}
