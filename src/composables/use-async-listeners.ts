import { getCurrentInstance, ref } from '@vue/composition-api'
import mapValues from 'lodash/mapValues'

export function useAsyncListeners() {
  const loading = ref(false)
  const listeners = mapValues(
    getCurrentInstance()?.$listeners,
    (callback: { (...args: unknown[]): Promise<void> }) => {
      return async function (...args: unknown[]) {
        loading.value = true
        const result = await callback(...args)
        loading.value = false
        return result
      }
    },
  )

  return { loading, listeners }
}
