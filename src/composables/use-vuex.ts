import { computed, ComputedRef, isRef, Ref, unref } from '@vue/composition-api'
import get from 'lodash/get'
import mapValues from 'lodash/mapValues'

import { useStore } from './use-plugins'

// eslint-disable-next-line import/no-unused-modules
export function useVuexComputedState<T>(path: string): ComputedRef<T> {
  return computed(() => get(useStore().state, path))
}

export function useVuexRawState<T>(path: string): T {
  return get(useStore().state, path)
}

export function useVuexGetter<T>(getter: string): ComputedRef<T> {
  return computed<T>(() => useStore().getters[getter])
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
function useVuexAction<T>(action: string, payload: any): Promise<T> {
  return useStore().dispatch(action, payload)
}

export function useVuexActionDispatcherWithReactivePayload(
  action: string,
  reactivePayload: Record<string, Ref> | Ref,
  loadingReference?: Ref<boolean>,
) {
  return async (): Promise<void> => {
    const promise = useVuexAction(
      action,
      isRef(reactivePayload)
        ? unref(reactivePayload)
        : mapValues(reactivePayload, (ref) => unref(ref)),
    )

    if (loadingReference) {
      loadingReference.value = true
      promise.then(() => (loadingReference.value = false))
    }

    await promise
  }
}
export function useVuexActionDispatcher<T>(
  action: string,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
  payload: any,
  loadingReference?: Ref<boolean>,
): { (): Promise<void> } {
  return async () => {
    const promise = useVuexAction(action, payload)

    if (loadingReference) {
      loadingReference.value = true
      promise.then(() => (loadingReference.value = false))
    }

    await promise
  }
}

export function useProperVuexActionDispatcher<T>(
  action: string,

  loadingReference?: Ref<boolean>,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
): (payload: any) => Promise<void> {
  return async (
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
    payload: any,
  ) => {
    const promise = useStore().dispatch(action, payload)

    if (loadingReference) {
      loadingReference.value = true
      promise.then(() => (loadingReference.value = false))
    }

    await promise
  }
}
