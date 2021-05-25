import {
  computed,
  ComputedRef,
  WritableComputedRef,
} from '@vue/composition-api'

import { useRootStore } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

export function createComputedSetter<T extends RestrictionNodeType>(
  field: T,
): WritableComputedRef<VisitorProfile[T]> {
  const store = useRootStore()
  return computed<VisitorProfile[T]>({
    get() {
      return store.state.visitorContext[field]
    },

    set(value) {
      store.mutations.setVisitorContextField({
        field,
        value,
      })
    },
  })
}

export function useCaption(
  type: RestrictionNodeType,
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
