import { Ref, ref } from '@vue/composition-api'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useAsyncState<T>(
  promise: Promise<T>,
  defaultState: T,
  catchFn?: { (e: Error): void },
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
      state.value = data
      ready.value = true
    })

    if (catchFn) {
      promise.catch(catchFn)
    }
  }

  run()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return { state, ready }
}
