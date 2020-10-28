import {
  computed,
  ComputedRef,
  nextTick,
  onMounted,
  onServerPrefetch,
  ref,
  Ref,
  watch,
} from '@vue/composition-api'
import isEmpty from 'lodash/isEmpty'

import {
  Destination,
  saveCountryDestination,
  updateAllCountryDestinations,
} from 'src/api/destinations'
import { useAsyncState } from 'src/composables/use-async'
import { useStore } from 'src/composables/use-plugins'
import { Loading, useLoading } from 'src/composables/use-promise-loading'
import {
  generateDestinationList,
  generateGroupedDestinationList,
  GroupedDestinations,
} from 'src/repositories/country-destinations'

type PersistAllFunc = <K extends keyof Destination>(
  field: K,
  value: Destination[K],
) => Promise<void>

type PersistOneFunc = <K extends keyof Destination>(
  field: K,
  value: Destination[K],
  destinationISO: string,
) => Promise<void>

export function useOriginDestinations(
  originCode: string,
): {
  list: Ref<Destination[]>
  loading: Ref<boolean>
  persistOneFieldValue: PersistOneFunc
  persistAllFieldValues: PersistAllFunc
} {
  const promise = generateDestinationList(originCode)
  const list = ref<Destination[]>([])
  const { loading } = useAsyncState(promise, [])

  void promise.then((destinations) => {
    list.value = destinations
      .map((plainDestination) => new Destination(plainDestination))
      .sort((a, b) => a.countryLabel.localeCompare(b.countryLabel))
  })

  const persistOneFieldValue: PersistOneFunc = async (
    field,
    value,
    destinationISO,
  ) => {
    list.value
      .filter((destination) => destination.countryCode === destinationISO)
      .map((destination) => (destination[field] = value))
    return saveCountryDestination(
      { [field]: value },
      originCode,
      destinationISO,
    )
  }

  const persistAllFieldValues: PersistAllFunc = async (field, value) => {
    list.value.map((destination) => (destination[field] = value))
    await updateAllCountryDestinations({ [field]: value }, originCode)
  }

  return {
    loading,
    list,
    persistOneFieldValue,
    persistAllFieldValues,
  }
}

export function useOriginGroupedDestinations(
  originCode: string,
): {
  destinations: ComputedRef<GroupedDestinations>
} & Loading {
  const destinations = computed<GroupedDestinations>(
    () => useStore().state.countryDestinations,
  )
  const { loading } = useLoading(false)
  onServerPrefetch(loadDestinationList)

  async function loadDestinationList() {
    loading.value = true
    await fetchDestinations(originCode)
    loading.value = false
  }

  watch(() => originCode, loadDestinationList)

  onMounted(async () => {
    if (!isEmpty(useStore().state.countryDestinations)) {
      return
    }

    await nextTick()
    await loadDestinationList()
  })

  return {
    destinations,
    loading,
  }
}

async function fetchDestinations(originCode: string): Promise<void> {
  useStore().commit(
    'setCountryDestinations',
    await generateGroupedDestinationList(originCode),
  )
}
