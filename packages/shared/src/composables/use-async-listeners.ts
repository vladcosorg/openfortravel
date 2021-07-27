import { getCurrentInstance } from 'vue'

import type {
  Loading,
  CallbackCollection,
} from '@/shared/src/composables/use-promise-loading'
import { useClosureCollectionLoading } from '@/shared/src/composables/use-promise-loading'

export function useAsyncListeners(): {
  listeners: CallbackCollection
} & Loading {
  const instance = getCurrentInstance()

  if (!instance) {
    throw new Error('Instance not available')
  }

  const rawListeners = instance.$listeners as CallbackCollection
  const { loading, closures: listeners } =
    useClosureCollectionLoading(rawListeners)

  return { loading, listeners }
}
