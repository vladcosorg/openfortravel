import {
  computed,
  ComputedRef,
  onServerPrefetch,
  onMounted,
} from '@vue/composition-api'

import { Destination } from 'src/api/destinations'
import { useStore } from 'src/composables/use-plugins'
import {
  Loading,
  useLoading,
  usePromiseLoading,
} from 'src/composables/use-promise-loading'

export function useCurrentDestination(
  originCode: string,
  destinationCode: string,
): {
  destination: ComputedRef<Destination>
} & Loading {
  const destination = computed<Destination>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    () => useStore().getters.currentDestination,
  )

  const { loading } = useLoading(false)

  onServerPrefetch(async () => {
    await fetchDestination(originCode, destinationCode)
  })

  onMounted(() => {
    if (destination.value.countryCode === destinationCode) {
      return
    }
    usePromiseLoading(fetchDestination(originCode, destinationCode), loading)
  })

  return { destination, loading }
}

async function fetchDestination(
  originCode: string,
  destinationCode: string,
): Promise<void> {
  await useStore().dispatch('loadDestination', {
    originCode,
    destinationCode,
  })
}
