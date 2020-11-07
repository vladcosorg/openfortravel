import { ComputedRef, onMounted, onServerPrefetch, Ref } from '@vue/composition-api'

import { Destination } from 'src/api/destinations/models'
import { Restriction } from 'src/api/restrictions/models'
import { useLoading } from 'src/composables/use-promise-loading'
import { useVuexActionDispatcher, useVuexGetter } from 'src/composables/use-vuex'

export function getRestriction(
  originCodeRef: Ref<string>,
  destinationCodeRef: Ref<string>,
): {
  restrictionRef: ComputedRef<Restriction>
  loadingRef: Ref<boolean>
} {
  const restrictionRef = useVuexGetter<Restriction>('destinationPage/getRestriction')
  const { loading: loadingRef } = useLoading(false)
  const fetcher = useVuexActionDispatcher(
    'destinationPage/fetchRestriction',
    {
      originCode: originCodeRef.value,
      destinationCode: destinationCodeRef.value,
    },
    loadingRef,
  )
  onServerPrefetch(fetcher)
  onMounted(fetcher)

  return { restrictionRef, loadingRef }
}

export function getDestination(
  destinationCodeRef: Ref<string>,
): {
  destinationRef: ComputedRef<Destination>
  loadingRef: Ref<boolean>
} {
  const destinationRef = useVuexGetter<Destination>('destinationPage/getDestination')
  const { loading: loadingRef } = useLoading(false)
  const fetcher = useVuexActionDispatcher(
    'destinationPage/fetchDestination',
    destinationCodeRef.value,
    loadingRef,
  )
  onServerPrefetch(fetcher)
  onMounted(fetcher)

  return { destinationRef, loadingRef }
}
