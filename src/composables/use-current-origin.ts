import {
  computed,
  ComputedRef,
  onServerPrefetch,
  onMounted,
} from '@vue/composition-api'

import { useStore } from 'src/composables/use-plugins'
import {
  Loading,
  useLoading,
  usePromiseLoading,
} from 'src/composables/use-promise-loading'
import { Origin } from 'src/models/origin'

export function useCurrentOrigin(
  originCode: string,
): {
  origin: ComputedRef<Origin>
} & Loading {
  const origin = computed<Origin>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    () => useStore().getters.currentOrigin,
  )

  const { loading } = useLoading(false)

  onServerPrefetch(async () => {
    await fetchOrigin(originCode)
  })

  onMounted(() => {
    if (origin.value.countryCode === originCode) {
      return
    }
    usePromiseLoading(fetchOrigin(originCode), loading)
  })

  return { origin, loading }
}

async function fetchOrigin(originCode: string): Promise<void> {
  await useStore().dispatch('loadOrigin', originCode)
}
