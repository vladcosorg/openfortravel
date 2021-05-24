import type { ComputedRef } from '@vue/composition-api'
import { computed } from '@vue/composition-api'

import { getStatusMapper } from '@/shared/src/api/restrictions/helper'
import type { Restriction } from '@/shared/src/api/restrictions/models'
import { RestrictionStatus } from '@/shared/src/api/restrictions/models'
import { useVueI18n } from '@/shared/src/composables/use-plugins'
import { getCurrentNationality } from '@/shared/src/modules/nationality/nationality-helpers'

export const statusColorMap = {
  [RestrictionStatus.ALLOWED]: 'positive',
  [RestrictionStatus.CONDITIONAL]: 'warning',
  [RestrictionStatus.FORBIDDEN]: 'negative',
}

export function useStats(
  destinations: ComputedRef<Restriction[]>,
): ComputedRef<
  Record<
    RestrictionStatus,
    {
      title: string
      value: number
      description: string
      valueSuffix: string
      colorClass: string
    }
  >
> {
  const { t } = useVueI18n()

  return computed(() =>
    getStatusMapper((status) => ({
      title: t(`page.index.sections.stats.types.${status}.title`) as string,
      description: t(
        `page.index.sections.stats.types.${status}.description`,
      ) as string,
      colorClass: `bg-${statusColorMap[status]}`,
      value: destinations.value.filter(
        (destination) => destination.status === status,
      ).length,
      valueSuffix: t(`page.index.sections.stats.types.${status}.valueSuffix`, {
        nationality: getCurrentNationality(),
      }) as string,
    })),
  )
}
