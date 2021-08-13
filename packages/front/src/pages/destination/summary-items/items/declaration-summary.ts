import { useVueI18n } from '@/shared/src/composables/use-plugins'
import { outlinedBallot as declarationIcon } from '@quasar/extras/material-icons-outlined'

import { SummaryItem } from '@/front/src/pages/destination/summary-items/summary-item'

const { t } = useVueI18n<string>()
export class DeclarationSummary extends SummaryItem {
  label = t('restriction.healthDeclaration.label')
  icon = declarationIcon

  get value(): string {
    if (
      this.destination.isHealthDeclarationRequired &&
      this.destination.healthDeclarationDocURL
    ) {
      return t('restriction.healthDeclaration.value.online')
    }

    return t(
      `restriction.healthDeclaration.value.${this.destination.isHealthDeclarationRequired}`,
    )
  }

  get caption(): string {
    if (
      this.destination.isHealthDeclarationRequired &&
      this.destination.healthDeclarationDocURL
    ) {
      return t('restriction.healthDeclaration.caption.online', {
        url: this.destination.healthDeclarationDocURL,
      })
    }

    return t(
      `restriction.healthDeclaration.caption.${this.destination.isHealthDeclarationRequired}`,
    )
  }

  get valueClasses(): string {
    if (
      this.destination.isHealthDeclarationRequired &&
      this.destination.healthDeclarationDocURL
    ) {
      return 'text-negative'
    }

    return ''
  }
}
