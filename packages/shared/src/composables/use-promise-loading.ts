import { computed, ComputedRef, Ref, ref } from '@vue/composition-api'
import { mapValues } from 'lodash-es'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
type FlexCallback = { (...args: any[]): Promise<unknown> }
type Callback = { (...args: unknown[]): Promise<unknown> }
export type CallbackCollection = Record<string, Callback>

export type Loading = {
  loading: Ref<boolean>
}

export function useLoading(defaultValue = false): Loading {
  const loading = ref(defaultValue)
  return { loading }
}

export function useLoadingSwitch(
  defaultValue = false,
): { state: Ref<boolean>; toggle: () => void } {
  const state = ref(defaultValue)
  return {
    state,
    toggle() {
      state.value = !state.value
    },
  }
}

export function useAggregatedLoader(
  ...loaders: Ref<boolean>[]
): ComputedRef<boolean> {
  return computed<boolean>(
    () => !loaders.every((loadingReference) => !loadingReference.value),
  )
}

export function useClosureCollectionLoading(
  closures: CallbackCollection,
): { closures: CallbackCollection } & Loading {
  const { loading } = useLoading()

  closures = (mapValues(
    closures,
    (callback: Callback): Callback =>
      async function (...args: unknown[]) {
        loading.value = true
        const result = await callback(...args)
        loading.value = false
        return result
      },
  ) as unknown) as CallbackCollection

  return {
    closures,
    loading,
  }
}

export function useClosureLoading(
  callback: FlexCallback,
): {
  callback: FlexCallback
} & Loading {
  const { loading } = useLoading()
  const wrappedCallback = async function (...args: unknown[]) {
    loading.value = true
    const result = await callback(...args)
    loading.value = false
    return result
  }
  return {
    loading,
    callback: wrappedCallback,
  }
}

export function usePromiseLoading(
  promise: Promise<unknown>,
  loadingReference?: Ref<boolean>,
): { loading: Ref<boolean> } {
  const loading = loadingReference ?? ref(true)
  if (loadingReference) {
    loading.value = true
  }

  promise.finally(() => (loading.value = false))
  return { loading }
}
