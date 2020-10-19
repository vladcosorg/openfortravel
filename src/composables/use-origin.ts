import { ref } from '@vue/composition-api'
import { getOrigin, PlainOrigin, updateOriginField } from 'src/api/Origin'
import { useAsyncState } from 'src/composables/use-async'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useOrigin(originCode: string, defaultState: PlainOrigin) {
  const loading = ref(true)
  const promise = getOrigin(originCode)
  const { state, ready } = useAsyncState(promise, defaultState)

  const updateField = async <
    K extends keyof PlainOrigin,
    V extends PlainOrigin[K]
  >(
    field: K,
    value: V,
  ) => {
    state.value[field] = value
    loading.value = true
    await updateOriginField(originCode, field, value)
    loading.value = false
  }

  void promise.then(() => (loading.value = false))

  return { ready, state, updateField, loading }
}
