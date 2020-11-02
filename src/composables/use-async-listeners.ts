import { getCurrentInstance } from '@vue/composition-api'

import {
  Loading,
  useClosureCollectionLoading,
  CallbackCollection,
} from 'src/composables/use-promise-loading'

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
