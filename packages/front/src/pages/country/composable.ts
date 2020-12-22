import {
  ComputedRef,
  onMounted,
  onServerPrefetch,
  Ref,
  watch,
  WritableComputedRef,
} from '@vue/composition-api'

import { Restriction } from '@/shared/src/api/restrictions/models'
import { useFilterableCollection } from '@/shared/src/composables/use-misc'
import { useLoading } from '@/shared/src/composables/use-promise-loading'
import {
  useProperVuexActionDispatcher,
  useVuexReactiveGetter,
} from '@/shared/src/composables/use-vuex'

export function useGroupedDestinations(
  originCodeRef: Ref<string>,
): {
  destinationsRef: ComputedRef<Restriction[]>
  isLoadingRef: Ref<boolean>
} {
  const { loading } = useLoading(false)
  const fetcher = useProperVuexActionDispatcher(
    'countryPage/fetchCountryDestinations',
    loading,
  )
  const destinationsRef = useVuexReactiveGetter<Restriction[]>(
    'countryPage/getDestinationObjects',
  )

  onServerPrefetch(() => fetcher(originCodeRef.value))
  onMounted(() => fetcher(originCodeRef.value))
  watch(originCodeRef, fetcher)

  return {
    isLoadingRef: loading,
    destinationsRef,
  }
}

export function useFilterableFlatDestinations(
  destinationsRef: ComputedRef<Restriction[]>,
): {
  filterLoadingRef: Ref<boolean>
  filteredDestinationsRef: ComputedRef<Restriction[]>
  filterRef: WritableComputedRef<string>
  isFilteringRef: ComputedRef<boolean>
} {
  const {
    filter,
    collection,
    loading: filterLoading,
    isFiltering,
  } = useFilterableCollection(destinationsRef, (input, filterValue) =>
    input
      .filter((destination) =>
        destination.destinationLabel.toLowerCase().includes(filterValue),
      )
      .sort(
        (destinationA, destinationB) =>
          destinationA.destinationLabel.indexOf(filterValue) -
          destinationB.destinationLabel.indexOf(filterValue),
      ),
  )

  return {
    filteredDestinationsRef: collection,
    filterRef: filter,
    isFilteringRef: isFiltering,
    filterLoadingRef: filterLoading,
  }
}
