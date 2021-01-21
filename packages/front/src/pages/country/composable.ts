import { matFlightTakeoff } from '@quasar/extras/material-icons'
import {
  computed,
  ComputedRef,
  onMounted,
  onServerPrefetch,
  ref,
  Ref,
  watch,
} from '@vue/composition-api'

import { CountryMap } from '@/front/src/pages/country/country-store'
import { RiskLevel } from '@/shared/src/api/destinations/models'
import { Restriction } from '@/shared/src/api/restrictions/models'
import { useLoading } from '@/shared/src/composables/use-promise-loading'
import {
  useProperVuexActionDispatcher,
  useVuexReactiveGetter,
} from '@/shared/src/composables/use-vuex'
import {
  getLabelForCountryCode,
  transformCodeToOriginSlug,
} from '@/shared/src/modules/country-list/country-list-helpers'

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

type InputFilter = (input: Restriction[]) => Restriction[]
export function useFilterer(
  input: ComputedRef<Restriction[]>,
  filters: InputFilter[],
): ComputedRef<Restriction[]> {
  return computed(() =>
    filters.reduce((restrictions, filter) => filter(restrictions), input.value),
  )
}

export function useCountryMatchFilter(): {
  filterValue: Ref<string>
  filterFunction: InputFilter
} {
  const filterValue = ref('')

  const filterFunction: InputFilter = (input: Restriction[]) => {
    if (!filterValue.value) {
      return input
    }

    return input
      .filter((restriction) =>
        restriction.destinationLabel.toLowerCase().includes(filterValue.value),
      )
      .sort(
        (destinationA, destinationB) =>
          destinationA.destinationLabel.indexOf(filterValue.value) -
          destinationB.destinationLabel.indexOf(filterValue.value),
      )
  }

  return {
    filterValue,
    filterFunction,
  }
}

export function useTabFilter(): {
  filterValue: Ref<string>
  filterFunction: InputFilter
} {
  const filterValue = ref('')

  const filterFunction: InputFilter = (input: Restriction[]) => {
    if (!filterValue.value) {
      return input
    }

    return input.filter(
      (restriction) => restriction.destinationContinent === filterValue.value,
    )
  }

  return {
    filterValue,
    filterFunction,
  }
}

export function useRestrictionFilterer(
  input: Ref<Restriction[]>,
): {
  countryMatchFilterValue: Ref<string>
  tabFilterValue: Ref<string>
  destinations: Ref<Restriction[]>
} {
  const {
    filterValue: countryMatchFilterValue,
    filterFunction: countryMatchFilterFunction,
  } = useCountryMatchFilter()
  const {
    filterValue: tabFilterValue,
    filterFunction: tabFilterFunction,
  } = useTabFilter()

  const destinations = useFilterer(input, [
    countryMatchFilterFunction,
    tabFilterFunction,
  ])

  return {
    countryMatchFilterValue,
    tabFilterValue,
    destinations,
  }
}

export function riskLevelColor(riskLevel: RiskLevel): string {
  switch (riskLevel) {
    case RiskLevel.NO_DATA:
      return 'text-positive'
    case RiskLevel.LOW:
      return 'text-info'
    case RiskLevel.MODERATE:
      return 'text-warning'
    case RiskLevel.HIGH:
      return 'text-negative'
    case RiskLevel.VERY_HIGH:
      return 'text-negative text-bold'

    default:
      throw new Error(`Unmapped risk level "${riskLevel}"`)
  }
}

export function getBreadcrumbs(
  originCode: Ref<string>,
  isLoading: Ref<boolean>,
): ComputedRef {
  return computed(() => ({
    originSlug: transformCodeToOriginSlug(originCode.value),
    items: [
      {
        label: `Destinations from ${getLabelForCountryCode(originCode.value)}`,
        icon: matFlightTakeoff,
      },
    ],
    loading: isLoading.value,
  }))
}
