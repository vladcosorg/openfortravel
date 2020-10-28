import { computed, ComputedRef, Ref } from '@vue/composition-api'

import { useStore } from './use-plugins'

export function useVuexGetter<T>(getter: string): ComputedRef<T> {
  return computed<T>(() => useStore().getters[getter])
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export function useVuexAction<T>(action: string, payload: any): Promise<T> {
  return useStore().dispatch(action, payload)
}

export function useVuexActionDispatcher<T>(
  action: string,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
  payload: any,
  loadingReference?: Ref<boolean>,
): { (): Promise<void> } {
  return async () => {
    const promise = useStore().dispatch(action, payload)

    if (loadingReference) {
      loadingReference.value = true
      promise.then(() => (loadingReference.value = false))
    }

    await promise
  }
}
