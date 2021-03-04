import { outlinedMedicalServices as insuranceIcon } from '@quasar/extras/material-icons-outlined'

import { SummaryItem } from '@/front/src/pages/destination/summary-items/summary-item'
import { useVueI18n } from '@/shared/src/composables/use-plugins'

const { t } = useVueI18n<string>()
export class InsuranceSummary extends SummaryItem {
  label = t('restriction.insurance.label')
  value = t(`restriction.insurance.value.${this.restriction.insuranceRequired}`)
  caption = 'No additional requirements at the border'
  icon = insuranceIcon
  public get valueClasses(): string {
    return this.restriction.insuranceRequired ? 'text-negative' : ''
  }
}
