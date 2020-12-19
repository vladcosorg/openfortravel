import {
  Loading,
  useClosureCollectionLoading,
  CallbackCollection,
} from '@/shared/src/composables/use-promise-loading'
import { getCurrentInstance } from '@vue/composition-api'

export function useAsyncListeners(): {
  listeners: CallbackCollection
} & Loading {
  const instance = getCurrentInstance()

  if (!instance) {
    throw new Error('Instance not available')
  }

  const rawListeners = instance.$listeners as CallbackCollection
  const { loading, closures: listeners } = useClosureCollectionLoading(
    rawListeners,
  )

  return { loading, listeners }
}
