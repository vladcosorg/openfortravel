import { matFlightTakeoff } from '@quasar/extras/material-icons'
import type { ComputedRef, Ref } from '@vue/composition-api'
import { computed, ref } from '@vue/composition-api'

import { buildTripsFromProfileOrigin } from '@/front/src/composables/restriction-query'
import { RoundTrip } from '@/front/src/models/RoundTrip'
import type { CountryMap } from '@/front/src/pages/country/country-store'
import { RiskLevel } from '@/shared/src/api/destinations/models'
import { Restriction } from '@/shared/src/api/restrictions/models'
import { useVueI18n } from '@/shared/src/composables/use-plugins'
import { useVuexReactiveGetter } from '@/shared/src/composables/use-vuex'
import { getLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'

export function useCountries(): {
  countries: ComputedRef<CountryMap>
} {
  return {
    countries: useVuexReactiveGetter<CountryMap>('countryPage/countryList'),
  }
}

export function useRestrictionList(): {
  allDestinations: ComputedRef<RoundTrip[]>
  allowedDestinations: ComputedRef<RoundTrip[]>
  forbiddenDestinations: ComputedRef<RoundTrip[]>
} {
  const allDestinations = buildTripsFromProfileOrigin(true)
  const allowedDestinations = computed(() =>
    allDestinations.value.filter((destination) => !destination.isForbidden),
  )

  const forbiddenDestinations = computed(() =>
    allDestinations.value.filter((destination) => destination.isForbidden),
  )

  return { allDestinations, allowedDestinations, forbiddenDestinations }
}

type InputFilter = (input: RoundTrip[]) => RoundTrip[]

export function useFilterer(
  input: ComputedRef<RoundTrip[]>,
  filters: InputFilter[],
): ComputedRef<RoundTrip[]> {
  return computed(() =>
    filters.reduce((restrictions, filter) => filter(restrictions), input.value),
  )
}

export function useCountryMatchFilter(): {
  filterValue: Ref<string>
  filterFunction: InputFilter
} {
  const filterValue = ref('')

  const filterFunction: InputFilter = (input: RoundTrip[]) => {
    if (!filterValue.value) {
      return input
    }

    return input
      .filter((restriction) => restriction.includesSubtring(filterValue.value))
      .sort(
        (destinationA, destinationB) =>
          destinationA.substringIndex(filterValue.value) -
          destinationB.substringIndex(filterValue.value),
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
  input: Ref<RoundTrip[]>,
): {
  countryMatchFilterValue: Ref<string>
  destinations: Ref<RoundTrip[]>
} {
  const {
    filterValue: countryMatchFilterValue,
    filterFunction: countryMatchFilterFunction,
  } = useCountryMatchFilter()

  const destinations = useFilterer(input, [countryMatchFilterFunction])

  return {
    countryMatchFilterValue,
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
  }
}

export function getBreadcrumbs(
  originCode: Ref<string>,
  isLoading: Ref<boolean>,
): ComputedRef {
  const { t } = useVueI18n()
  return computed(() => ({
    items: [
      {
        label: t('page.country.breadcrumb', {
          country: getLabelForCountryCode(originCode.value),
        }),
        icon: matFlightTakeoff,
      },
    ],
    loading: isLoading.value,
  }))
}
