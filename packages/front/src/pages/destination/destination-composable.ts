import { matFlightLand, matFlightTakeoff } from '@quasar/extras/material-icons'
import type { ComputedRef, Ref } from '@vue/composition-api'
import { computed } from '@vue/composition-api'

import { useRootStore, useVueI18n } from '@/shared/src/composables/use-plugins'
import {
  getDestinationLabelForCountryCode,
  getOriginLabelForCountryCode,
  transformCountryCodeToOriginSlug,
} from '@/shared/src/modules/country-list/country-list-helpers'

export function useBreadcrumbs(
  originCode: Ref<string>,
  destinationCode: Ref<string>,
): ComputedRef<unknown> {
  const { t } = useVueI18n()
  return computed(() => [
    {
      label: t('page.country.breadcrumb', {
        country: getOriginLabelForCountryCode(originCode.value),
      }),
      to: {
        name: 'origin',
        params: {
          originSlug: transformCountryCodeToOriginSlug(originCode.value),
          searchId: useRootStore().state.searchId,
        },
      },
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
