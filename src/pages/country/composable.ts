import {
  computed,
  ComputedRef,
  onMounted,
  onServerPrefetch,
  Ref,
  watch,
  WritableComputedRef,
} from '@vue/composition-api'

import { Restriction } from 'src/api/restrictions/models'
import { useFilterableCollection } from 'src/composables/use-misc'
import { useLoading } from 'src/composables/use-promise-loading'
import {
  useProperVuexActionDispatcher,
  useVuexGetter,
} from 'src/composables/use-vuex'
import { GroupedDestinations } from 'src/pages/country/country-store'

type GroupedDestinationObjects = GroupedDestinations<Restriction>

export function useGroupedDestinations(
  originCodeRef: Ref<string>,
): {
  destinationsRef: ComputedRef<GroupedDestinationObjects>
  isLoadingRef: Ref<boolean>
} {
  const { loading } = useLoading(false)
  const fetcher = useProperVuexActionDispatcher(
    'countryPage/fetchCountryDestinations',
    loading,
  )
  const destinationsRef = useVuexGetter<GroupedDestinationObjects>(
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
  destinationsRef: ComputedRef<GroupedDestinationObjects>,
): {
  filterLoadingRef: Ref<boolean>
  filteredDestinationsRef: ComputedRef<Restriction[]>
  filterRef: WritableComputedRef<string>
  isFilteringRef: ComputedRef<boolean>
} {
  const flatDestinationsRef = computed(
    () => Object.values(destinationsRef.value).flat() as Restriction[],
  )

  const {
    filter,
    collection,
    loading: filterLoading,
    isFiltering,
  } = useFilterableCollection(flatDestinationsRef, (input, filterValue) => {
    return input
      .filter((destination) => {
        return destination.destinationLabel.toLowerCase().includes(filterValue)
      })
      .sort(
        (destinationA, destinationB) =>
          destinationA.destinationLabel.indexOf(filterValue) -
          destinationB.destinationLabel.indexOf(filterValue),
      )
  })

  return {
    filteredDestinationsRef: collection,
    filterRef: filter,
    isFilteringRef: isFiltering,
    filterLoadingRef: filterLoading,
  }
}
