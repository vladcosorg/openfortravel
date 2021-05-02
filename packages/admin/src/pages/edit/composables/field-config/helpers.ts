import type {
  Ref,
  SetupContext,
  WritableComputedRef} from '@vue/composition-api';
import {
  computed
} from '@vue/composition-api'

import { typeConstructors } from '@/shared/src/restriction-tree/converter'
import type { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export type ExtractOptions<
  T extends RestrictionNodeType
> = typeof typeConstructors[T]['defaultOptions']
export type FieldConfig = {
  type: unknown
  bind: Record<string, unknown>
  model: WritableComputedRef<unknown>
  on?: Record<string, unknown>
}

export function getSetters<
  T extends RestrictionNodeType,
  A extends ExtractOptions<T>,
  K extends keyof A
>(
  type: T,
  currentOptions: Ref<Record<string, unknown>>,
  emit: SetupContext['emit'],
): Record<K, WritableComputedRef<A[K]>> {
  const optionDefaults = typeConstructors[type].defaultOptions
  const out: ReturnType<typeof getSetters> = {}

  for (const [optionID, optionValue] of Object.entries(optionDefaults)) {
    out[optionID] = computed({
      get() {
        if (currentOptions.value[optionID] !== undefined) {
          return currentOptions.value[optionID]
        }
        return (out[optionID].value = optionValue)
      },
      set(value) {
        emit(
          'input',
          Object.assign({}, currentOptions.value, { [optionID]: value }),
        )
      },
    })
  }

  return out as any
}
