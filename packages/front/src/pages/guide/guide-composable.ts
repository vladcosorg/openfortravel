import {
  computed,
  ComputedRef,
  getCurrentInstance,
  Ref,
  WritableComputedRef,
} from '@vue/composition-api'

import { VisitorContextType } from '@/shared/src/restriction-tree/visitor-context'

export function createComputedSetter<T extends keyof VisitorContextType>(
  contextRef: Ref<VisitorContextType>,
  key: T,
): WritableComputedRef<VisitorContextType[T]> {
  const instance = getCurrentInstance()
  return computed({
    get() {
      return contextRef.value[key]
    },
    set(newValue) {
      instance?.$emit(
        'input',
        Object.assign({}, contextRef.value, {
          [key]: newValue,
        }),
      )
    },
  })
}

export function useCaption(
  input: Ref<string | string[] | undefined>,
  truthyFormatter: (item: string) => string,
  falsyOptionalFormatter?: () => string,
): ComputedRef<string> {
  const falsyFormatter =
    falsyOptionalFormatter ??
    function () {
      return 'Not specified'
    }

  return computed(() => {
    const value = input.value
    if ((Array.isArray(value) && value.length === 0) || !value) {
      return 'Answer: ' + falsyFormatter()
    }

    const formatted = Array.isArray(value)
      ? value.map((item) => truthyFormatter(item)).join(', ')
      : truthyFormatter(value)

    return `Answer: ${formatted}`
  })
}
