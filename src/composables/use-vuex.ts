import { computed, ComputedRef, Ref } from '@vue/composition-api'

import { useStore } from './use-plugins'

import { StateInterface } from 'src/store'

type StateKey = keyof StateInterface
type StateValue<T extends StateKey> = StateInterface[T]
type FrozenStateValue<T extends StateKey> = Readonly<StateValue<T>>
type CondStateValue<
  K extends StateKey,
  T extends boolean = false
> = T extends true ? FrozenStateValue<K> : StateValue<K>
type ComputedCondStateValue<
  K extends StateKey,
  T extends boolean = false
> = ComputedRef<CondStateValue<K, T>>

export function useVuexState<T extends StateKey>(
  stateField: T,
): ComputedCondStateValue<T>
export function useVuexState<T extends StateKey, F extends boolean>(
  stateField: T,
  freeze: F,
): ComputedCondStateValue<T, F>
export function useVuexState<T extends StateKey, F extends boolean>(
  stateField: T,
  freeze = false,
): ComputedCondStateValue<T> {
  return computed(() => {
    const state = useStore().state[stateField]

    if (freeze) {
      return Object.freeze(state) as CondStateValue<T>
    }

    return state as CondStateValue<T>
  })
}

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
