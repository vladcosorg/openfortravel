import { useVueI18n } from '@/shared/src/composables/use-plugins'
import { Breadcrumbs } from '@/shared/src/misc/type-helpers'
import {
  getDestinationLabelForCountryCode,
  getOriginLabelForCountryCode,
} from '@/shared/src/modules/country-list/country-list-helpers'
import { matFlightLand, matFlightTakeoff } from '@quasar/extras/material-icons'
import type { ComputedRef, Ref } from 'vue'
import { computed } from 'vue'

import { getOriginRouteURL } from '@/front/src/router/route-builders/origin'

export function useBreadcrumbs(
  originCode: Ref<string>,
  destinationCode: ComputedRef<string>,
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
    {
      label: t('page.destination.breadcrumb', {
        country: getDestinationLabelForCountryCode(destinationCode.value),
      }),
      icon: matFlightLand,
    },
  ])
}
