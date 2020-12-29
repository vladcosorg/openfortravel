import {
  ComputedRef,
  onMounted,
  onServerPrefetch,
  Ref,
  watch,
  WritableComputedRef,
} from '@vue/composition-api'

import { CountryMap } from '@/front/src/pages/country/country-store'
import { RiskLevel } from '@/shared/src/api/destinations/models'
import { Restriction } from '@/shared/src/api/restrictions/models'
import { useFilterableCollection } from '@/shared/src/composables/use-misc'
import { useLoading } from '@/shared/src/composables/use-promise-loading'
import {
  useProperVuexActionDispatcher,
  useVuexReactiveGetter,
} from '@/shared/src/composables/use-vuex'

export function useCountries(): {
  countries: ComputedRef<CountryMap>
  isLoading: Ref<boolean>
} {
  const { loading: isLoading } = useLoading(false)
  const fetcher = useProperVuexActionDispatcher(
    'countryPage/fetchCountries',
    isLoading,
  )
  onMounted(fetcher)

  return {
    isLoading,
    countries: useVuexReactiveGetter<CountryMap>('countryPage/countryList'),
  }
}

export function useGroupedDestinations(
  originCodeRef: Ref<string>,
): {
  destinationsRef: ComputedRef<Restriction[]>
  isLoadingRef: Ref<boolean>
} {
  const { loading } = useLoading(false)
  const fetcher = useProperVuexActionDispatcher(
    'countryPage/fetchRestrictions',
    loading,
  )
  const destinationsRef = useVuexReactiveGetter<Restriction[]>(
    'countryPage/restrictionList',
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

export function riskLevelColor(riskLevel: RiskLevel): string {
  switch (riskLevel) {
    case RiskLevel.NO_DATA:
      return 'text-grey-13'
    case RiskLevel.LOW:
      return 'text-green-13'
    case RiskLevel.MODERATE:
      return 'text-yellow-9'
    case RiskLevel.HIGH:
      return 'text-orange'
    case RiskLevel.VERY_HIGH:
      return 'text-red-13'

    default:
      throw new Error(`Unmapped risk level "${riskLevel}"`)
  }
}
