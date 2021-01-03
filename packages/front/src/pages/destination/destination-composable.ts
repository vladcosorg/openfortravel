import {
  ComputedRef,
  onMounted,
  onServerPrefetch,
  Ref,
  watch,
} from '@vue/composition-api'

import { Destination } from '@/shared/src/api/destinations/models'
import { Restriction } from '@/shared/src/api/restrictions/models'
import { useLoading } from '@/shared/src/composables/use-promise-loading'
import {
  useVuexActionDispatcherWithReactivePayload,
  useVuexReactiveGetter,
} from '@/shared/src/composables/use-vuex'

export function getRestriction(
  originCodeRef: Ref<string>,
  destinationCodeRef: Ref<string>,
  returnDirection = false,
): {
  restrictionRef: ComputedRef<Restriction>
  loadingRef: Ref<boolean>
} {
  const restrictionRef = useVuexReactiveGetter<Restriction>(
    `destinationPage/get${returnDirection ? 'Return' : ''}Restriction`,
  )
  const { loading: loadingRef } = useLoading()
  const fetcher = useVuexActionDispatcherWithReactivePayload(
    `destinationPage/fetch${returnDirection ? 'Return' : ''}Restriction`,
    {
      originCode: originCodeRef,
      destinationCode: destinationCodeRef,
    },
    loadingRef,
  )

  onServerPrefetch(fetcher)
  onMounted(fetcher)
  watch([originCodeRef, destinationCodeRef], fetcher)

  return { restrictionRef, loadingRef }
}

export function getDestination(
  destinationCodeRef: Ref<string>,
  returnDirection = false,
): {
  destinationRef: ComputedRef<Destination>
  loadingRef: Ref<boolean>
} {
  const { loading: loadingRef } = useLoading()
  const fetcher = useVuexActionDispatcherWithReactivePayload(
    returnDirection
      ? 'destinationPage/fetchReturnDestination'
      : 'destinationPage/fetchDestination',
    destinationCodeRef,
    loadingRef,
  )

  onServerPrefetch(fetcher)
  onMounted(fetcher)

  return {
    destinationRef: useVuexReactiveGetter<Destination>(
      returnDirection
        ? 'destinationPage/getReturnDestination'
        : 'destinationPage/getDestination',
    ),
    loadingRef,
  }
}
