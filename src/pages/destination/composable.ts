import {
  computed,
  ComputedRef,
  onMounted,
  onServerPrefetch,
  Ref,
} from '@vue/composition-api'

import { PlainRestriction, Restriction } from 'src/api/restrictions/models'
import { useLoading } from 'src/composables/use-promise-loading'
import {
  useVuexActionDispatcher,
  useVuexRawState,
} from 'src/composables/use-vuex'

export function getRestriction(
  originCodeRef: Ref<string>,
  destinationCodeRef: Ref<string>,
): {
  restrictionRef: ComputedRef<Restriction>
  loadingRef: Ref<boolean>
} {
  const restrictionRef = computed(
    () =>
      new Restriction(
        useVuexRawState<PlainRestriction>('destinationPage.restriction'),
      ),
  )
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
