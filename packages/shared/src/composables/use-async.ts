import type { Ref } from '@vue/composition-api'
import { ref } from '@vue/composition-api'

import { usePromiseLoading } from '@/shared/src/composables/use-promise-loading'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useAsyncState<T>(
  promise: Promise<T>,
  defaultState: T,
  { freeze }: { freeze: boolean } = { freeze: false },
): {
  state: Ref<T>
  ready: Ref<boolean>
  loading: Ref<boolean>
} {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment
  const state = ref<T>(defaultState) as any
  const ready = ref<boolean>(false)
  const { loading } = usePromiseLoading(promise)

  void promise.then((data: T) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    state.value = freeze ? Object.freeze(data) : data
    ready.value = true
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return { state, ready, loading }
}
