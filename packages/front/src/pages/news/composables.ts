import { upperFirst } from 'lodash'
import { computed, ComputedRef } from 'vue'

import { getCurrentMonthAndYear } from '@/front/src/misc/date'
import { useCustomI18n } from '@/front/src/modules/i18n/composables'

export function useBlogTitle(
  originIso: ComputedRef<string>,
): ComputedRef<string> {
  const { locale, tl } = useCustomI18n()
  return computed(() =>
    upperFirst(
      tl('page.travelAlertsVaccinated.heading', {
        origin: originIso.value,
        date: getCurrentMonthAndYear(locale.value),
      }),
    ),
  )
}
