import { ComputedRef, onServerPrefetch, onMounted } from '@vue/composition-api'

import { Destination } from 'src/api/destinations'
import { Loading, useLoading } from 'src/composables/use-promise-loading'
import {
  useVuexActionDispatcher,
  useVuexGetter,
} from 'src/composables/use-vuex'

export function useCurrentDestination(
  originCode: string,
  destinationCode: string,
): {
  destination: ComputedRef<Destination>
} & Loading {
  const destination = useVuexGetter<Destination>('currentDestination')
  const { loading } = useLoading(false)
  const fetcher = useVuexActionDispatcher(
    'loadDestination',
    {
      originCode,
      destinationCode,
    },
    loading,
  )
  onServerPrefetch(fetcher)
  onMounted(fetcher)

  return { destination, loading }
}
