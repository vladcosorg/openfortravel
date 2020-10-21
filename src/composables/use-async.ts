import { Ref, ref } from '@vue/composition-api'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useAsyncState<T>(
  promise: Promise<T>,
  defaultState: T,
  { freeze }: { freeze: boolean } = { freeze: true },
): {
  state: Ref<T>
  ready: Ref<boolean>
} {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment
  const state = ref<T>(defaultState) as any
  const ready = ref<boolean>(false)

  function run() {
    void promise.then((data: T) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      state.value = freeze ? Object.freeze(data) : data
      ready.value = true
    })
  }

  run()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return { state, ready }
}

export function useAsyncStateWithMapper<T, K>(
  promise: Promise<T[]>,
  mapper: { (item: T): K },
): { state: Ref<K[]>; loading: Ref<boolean> } {
  const state = ref<K[]>([])
  const loading = ref<boolean>(true)

  void promise.then((data: T[]) => {
    state.value = data.map(mapper)
    loading.value = false
  })

  return { state, loading }
}
