import { outlinedLocalPolice as borderIcon } from '@quasar/extras/material-icons-outlined'

import { SummaryItem } from '@/front/src/pages/destination/summary-items/summary-item'
import { RestrictionStatus } from '@/shared/src/api/restrictions/models'
import { useVueI18n } from '@/shared/src/composables/use-plugins'

const { t } = useVueI18n<string>()
export class StatusSummary extends SummaryItem {
  protected readonly statusMap = {
    [RestrictionStatus.ALLOWED]: '',
    [RestrictionStatus.CONDITIONAL]: 'text-warning',
    [RestrictionStatus.FORBIDDEN]: 'text-negative',
    [RestrictionStatus.ALLOWED_SOON]: 'text-info',
  }
  label = t('restriction.travel.label')
  value = t(`restriction.travel.value.${this.restriction.status}`)
  caption = t(`restriction.travel.caption.${this.restriction.status}`)
  icon = borderIcon

  public get valueClasses(): string {
    return this.statusMap[this.restriction.status]
  }
}