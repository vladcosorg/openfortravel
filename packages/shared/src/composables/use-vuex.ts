import {
  computed,
  ComputedRef,
  isRef,
  onMounted,
  onServerPrefetch,
  Ref,
  unref,
  watch,
} from '@vue/composition-api'
import { get, mapValues } from 'lodash'

import { useStore } from '@/shared/src/composables/use-plugins'
import { useLoading } from '@/shared/src/composables/use-promise-loading'

// eslint-disable-next-line import/no-unused-modules
export function useVuexComputedState<T>(path: string): ComputedRef<T> {
  return computed(() => get(useStore().state, path))
}

export function useStateProperty<T>(
  property: keyof T,
  module?: string,
): T[keyof T] {
  let path: Array<keyof T | string> = [property]
  if (module) {
    path = [module, property]
  }
  return get(useStore().state, path.join('.'))
}

export function useReactiveStateProperty<T>(
  property: keyof T,
  module?: string,
): ComputedRef<T[keyof T]> {
  return computed(() => useStateProperty(property, module))
}

// eslint-disable-next-line import/no-unused-modules
export function useVuexRawStateProperty<T>(path: string): T {
  return get(useStore().state, path)
}

export function useVuexRawGetter<T>(getter: string): T {
  return useStore().getters[getter]
}
export function useVuexReactiveGetter<T>(getter: string): ComputedRef<T> {
  return computed<T>(() => useStore().getters[getter])
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
function dispatchAction<T>(action: string, payload: any): Promise<T> {
  return useStore().dispatch(action, payload)
}

export function createReactiveDispatcher(
  action: string,
  reactivePayload: Record<string, Ref> | Ref,
  triggerOn:
    | {
        mount?: boolean
        prefetch?: boolean
        change?: boolean
      }
    | boolean = true,
): {
  isLoading: Ref<boolean>
  dispatcher: () => Promise<void>
} {
  const { loading } = useLoading()
  const dispatcher = async (): Promise<void> => {
    const promise = dispatchAction(
      action,
      isRef(reactivePayload)
        ? unref(reactivePayload)
        : mapValues(reactivePayload, (ref) => unref(ref)),
    )
    loading.value = true
    promise.then(() => {
      loading.value = false
    })

    await promise
  }

  if (triggerOn) {
    onMounted(dispatcher)
    onServerPrefetch(dispatcher)
    watch(
      isRef(reactivePayload)
        ? [reactivePayload]
        : Object.values(reactivePayload),
      dispatcher,
    )
  }

  return { isLoading: loading, dispatcher }
}

export function useProperVuexActionDispatcher(
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
