import {
  ComputedRef,
  onMounted,
  onServerPrefetch,
  ref,
  Ref,
  watch,
  WritableComputedRef,
} from '@vue/composition-api'
import mapValues from 'lodash/mapValues'

import {
  Destination,
  saveCountryDestination,
  updateAllCountryDestinations,
} from 'src/api/destinations'
import { useAsyncState } from 'src/composables/use-async'
import { useFilterableCollection } from 'src/composables/use-misc'
import { Loading, useLoading } from 'src/composables/use-promise-loading'
import {
  useVuexActionDispatcher,
  useVuexGetter,
} from 'src/composables/use-vuex'
import {
  generateDestinationList,
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
  filterLoading: Ref<boolean>
  destinations: ComputedRef<GroupedDestinations<Destination>>
  filter: WritableComputedRef<string>
} & Loading {
  const { loading } = useLoading(false)
  const fetcher = useVuexActionDispatcher(
    'fetchCountryDestinations',
    originCode,
    loading,
  )
  const {
    filter,
    collection,
    loading: filterLoading,
  } = useFilterableCollection(
    useVuexGetter<GroupedDestinations<Destination>>(
      'getCountryDestinationsObjects',
    ),
    (input, filterValue) => {
      return mapValues(input, (group) => {
        if (group === undefined) {
          return group
        }

        return group.filter((destinations) => {
          return destinations.countryLabel.toLowerCase().includes(filterValue)
        })
      })
    },
  )

  onServerPrefetch(fetcher)
  watch(() => originCode, fetcher)
  onMounted(fetcher)

  return {
    destinations: collection,
    loading,
    filter,
    filterLoading,
  }
}
