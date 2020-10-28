import {
  computed,
  ComputedRef,
  onServerPrefetch,
  onMounted,
  Ref,
  watch,
} from '@vue/composition-api'

import { useStore } from 'src/composables/use-plugins'
import {
  Loading,
  useLoading,
  usePromiseLoading,
} from 'src/composables/use-promise-loading'
import { Origin } from 'src/models/origin'

export function useCurrentOrigin(
  originCode: Ref<string>,
): {
  origin: ComputedRef<Origin>
} & Loading {
  const { loading } = useLoading(false)
  async function fetchOrigin() {
    await usePromiseLoading(
      useStore().dispatch('loadOrigin', originCode.value),
      loading,
    )
  }

  const origin = computed<Origin>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    () => useStore().getters.currentOrigin,
  )

  onServerPrefetch(fetchOrigin)
  onMounted(fetchOrigin)
  watch(originCode, fetchOrigin)

  return { origin, loading }
}
