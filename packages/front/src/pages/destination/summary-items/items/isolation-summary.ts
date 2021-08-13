import { outlinedHttps as houseIcon } from '@quasar/extras/material-icons-outlined'

import { SummaryItem } from '@/front/src/pages/destination/summary-items/summary-item'
import { useVueI18n } from '@/shared/src/composables/use-plugins'

const { t } = useVueI18n<string>()
export class IsolationSummary extends SummaryItem {
  label = t('restriction.selfIsolation.label')
  value = this.restriction.selfIsolation
    ? t('restriction.selfIsolation.days', {
        number: this.destination.selfIsolationInDays,
      })
    : t('restriction.selfIsolation.staticValue.false')
  caption = 'No additional requirements at the border'
  icon = houseIcon

  public get valueClasses(): string {
    return this.restriction.selfIsolation ? 'text-negative' : 'text-info'
  }
}
