import {
  computed,
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
  useProperVuexActionDispatcher,
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

export function useRelatedRestrictionsByDestination(
  destinationCode: Ref<string>,
): {
  restrictions: ComputedRef<Restriction[]>
  isLoading: Ref<boolean>
} {
  const { loading } = useLoading(false)
  const fetcher = useProperVuexActionDispatcher(
    'destinationPage/fetchRelatedRestrictions',
    loading,
  )
  const restrictions = useVuexReactiveGetter<Restriction[]>(
    'destinationPage/relatedRestrictionList',
  )

  onServerPrefetch(() => fetcher(destinationCode.value))
  onMounted(() => fetcher(destinationCode.value))
  watch(destinationCode, fetcher)

  return {
    isLoading: loading,
    restrictions,
  }
}

export function useRelatedRestrictionList(): ComputedRef<string[]> {
  const restrictions = useVuexReactiveGetter<Restriction[]>(
    'destinationPage/relatedRestrictionList',
  )
  return computed(() =>
    restrictions.value
      .filter((restriction) => !restriction.isAllowed())
      .map((restriction) => restriction.originLabel),
  )
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
  watch([destinationCodeRef], fetcher)

  return {
    destinationRef: useVuexReactiveGetter<Destination>(
      returnDirection
        ? 'destinationPage/getReturnDestination'
        : 'destinationPage/getDestination',
    ),
    loadingRef,
  }
}
