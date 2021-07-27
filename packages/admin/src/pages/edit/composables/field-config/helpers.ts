import type { Ref, SetupContext, WritableComputedRef } from 'vue'
import { computed } from 'vue'

import { typeConstructors } from '@/shared/src/restriction-tree/converter'
import type { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export type ExtractOptions<T extends RestrictionNodeType> =
  typeof typeConstructors[T]['defaultOptions']
export type FieldConfig = {
  type: unknown
  bind: Record<string, unknown>
  attrs?: Record<string, unknown>
  on?: Record<string, unknown>
  class?: string
}

export function getSetters<
  T extends RestrictionNodeType,
  A extends ExtractOptions<T>,
  K extends keyof A,
>(
  _type: T,
  currentOptions: Ref<Record<string, unknown>>,
  emit: SetupContext['emit'],
): Record<K, WritableComputedRef<A[K]>> {
  const out: ReturnType<typeof getSetters> = {}
  for (const optionID of Object.keys(currentOptions.value)) {
    out[optionID] = computed({
      get() {
        return currentOptions.value[optionID]
      },
      set(value) {
        emit('input', { [optionID]: value })
      },
    })
  }

  return out as any
}
