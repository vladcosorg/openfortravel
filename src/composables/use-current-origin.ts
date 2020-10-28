import {
  ComputedRef,
  onServerPrefetch,
  onMounted,
  Ref,
  watch,
} from '@vue/composition-api'

import {
  Loading,
  useLoading,
  usePromiseLoading,
} from 'src/composables/use-promise-loading'
import { useVuexAction, useVuexGetter } from 'src/composables/use-vuex'
import { Origin } from 'src/models/origin'

export function useCurrentOrigin(
  originCode: Ref<string>,
): {
  origin: ComputedRef<Origin>
} & Loading {
  const { loading } = useLoading(false)
  async function fetchOrigin() {
    const promise = useVuexAction('loadOrigin', originCode.value)
    usePromiseLoading(promise, loading)
    await promise
  }

  const origin = useVuexGetter<Origin>('currentOrigin')
  onServerPrefetch(fetchOrigin)
  onMounted(fetchOrigin)
  watch(originCode, fetchOrigin)

  return { origin, loading }
}
