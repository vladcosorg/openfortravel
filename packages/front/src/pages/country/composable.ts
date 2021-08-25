import { matFlightTakeoff } from '@quasar/extras/material-icons'
import { computed, ref } from 'vue'

import { getOriginRouteURL } from '@/front/src/router/route-builders/origin'
import { useVueI18n } from '@/shared/src/composables/use-plugins'
import { Breadcrumbs } from '@/shared/src/misc/type-helpers'
import { RiskLevel } from '@/shared/src/models/country-factsheet/raw-country-factsheet'
import { RoundTripCollection } from '@/shared/src/models/trip/round-trip'
import { getOriginLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'

import type { ComputedRef, Ref } from 'vue'

type InputFilter = (input: RoundTripCollection) => RoundTripCollection

export function useFilterer(
  input: ComputedRef<RoundTripCollection>,
  filters: InputFilter[],
): ComputedRef<RoundTripCollection> {
  return computed(() =>
    filters.reduce((restrictions, filter) => filter(restrictions), input.value),
  )
}

export function useCountryMatchFilter(): {
  filterValue: Ref<string>
  filterFunction: InputFilter
} {
  const filterValue = ref('')

  const filterFunction: InputFilter = (input: RoundTripCollection) => {
    if (!filterValue.value) {
      return input
    }

    return input
      .filter((trip) =>
        trip.outgoing.destination.includesSubtring(filterValue.value),
      )
      .sort(
        (tripA, tripB) =>
          tripA.outgoing.destination.substringIndex(filterValue.value) -
          tripB.outgoing.destination.substringIndex(filterValue.value),
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

  const filterFunction: InputFilter = (input: RoundTripCollection) => {
    if (!filterValue.value) {
      return input
    }

    return input.filter(
      (restriction) =>
        restriction.outgoing.destination.continent === filterValue.value,
    )
  }

  return {
    filterValue,
    filterFunction,
  }
}

export function useRestrictionFilterer(input: Ref<RoundTripCollection>): {
  countryMatchFilterValue: Ref<string>
  destinations: Ref<RoundTripCollection>
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

export function useBreadcrumbs(
  originCode: Ref<string>,
): ComputedRef<Breadcrumbs> {
  const { t } = useVueI18n()
  return computed(() => [
    {
      label: t('page.country.breadcrumb', {
        country: getOriginLabelForCountryCode(originCode.value),
      }),
      to: getOriginRouteURL(),
      icon: matFlightTakeoff,
    },
  ])
}
