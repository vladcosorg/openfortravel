import { computed, ComputedRef, WritableComputedRef } from 'vue'

import { RootStateType } from '@/front/src/store/state'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

export function createComputedSetter<
  T extends keyof RootStateType['visitorContext'],
>(field: T, withDefaults: false): WritableComputedRef<VisitorProfile[T]> {
  const store = useRootStore()
  return computed<VisitorProfile[T]>({
    get() {
      return withDefaults
        ? store.getters.visitorContextWithDefaults[field]
        : store.state.visitorContext[field]
    },

    set(value) {
      store.actions.updateVisitorProfileField({
        field,
        value,
      })
    },
  })
}

export function useCaption(
  type: keyof RootStateType['visitorContext'],
  truthyFormatter: (item: string) => string,
  falsyOptionalFormatter?: () => string,
): ComputedRef<string> {
  const store = useRootStore()
  const falsyFormatter =
    falsyOptionalFormatter ??
    function () {
      return 'Not specified'
    }

  return computed(() => {
    const value = store.state.visitorContext[type]
    if ((Array.isArray(value) && value.length === 0) || !value) {
      return 'Answer: ' + falsyFormatter()
    }

    const formatted = Array.isArray(value)
      ? value.map((item) => truthyFormatter(item)).join(', ')
      : truthyFormatter(value)

    return `Answer: ${formatted}`
  })
}
