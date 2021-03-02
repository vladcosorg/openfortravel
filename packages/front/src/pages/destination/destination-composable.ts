import { matFlightLand, matFlightTakeoff } from '@quasar/extras/material-icons'
import { computed, ComputedRef } from '@vue/composition-api'

import { Restriction } from '@/shared/src/api/restrictions/models'
import { useVueI18n } from '@/shared/src/composables/use-plugins'

export function useBreadcrumbs(
  restrictionRef: ComputedRef<Restriction | undefined>,
): ComputedRef<unknown> {
  const { t } = useVueI18n()
  return computed(() => {
    if (!restrictionRef.value) {
      return
    }

    return [
      {
        label: t('page.country.breadcrumb', {
          country: restrictionRef.value.originLabel,
        }),
        to: {
          name: 'origin',
          params: {
            originSlug: restrictionRef.value.originSlug,
          },
        },
        icon: matFlightTakeoff,
      },
      {
        label: t('page.destination.breadcrumb', {
          country: restrictionRef.value.destinationLabel,
        }),
        icon: matFlightLand,
      },
    ]
  })
}
