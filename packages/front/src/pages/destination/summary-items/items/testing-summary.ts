import { outlinedCoronavirus as testIcon } from '@quasar/extras/material-icons-outlined'

import type { Badge } from '@/front/src/pages/destination/summary-items/summary-item';
import { SummaryItem } from '@/front/src/pages/destination/summary-items/summary-item'
import { useVueI18n } from '@/shared/src/composables/use-plugins'

const { t } = useVueI18n<string>()
export class TestingSummary extends SummaryItem {
  value = t(`restriction.testing.value.${this.restriction.testRequired}`)
  icon = testIcon

  public get valueClasses(): string {
    return this.restriction.testRequired ? 'text-negative' : ''
  }

  get label(): string {
    let label = t('restriction.testing.extendedLabel.pcrTest')
    if (this.destination.proofOfRecoveryInDays > 0) {
      label += t('restriction.testing.extendedLabel.orRecoveryProof')
    }

    return label
  }

  get badges(): Badge[] {
    const badges: Badge[] = []

    if (!this.restriction.testRequired) {
      return badges
    }

    if (this.destination.testOnArrival) {
      badges.push({
        label: t('restriction.testing.badges.onArrival'),
        color: 'positive',
      })
    }

    if (this.destination.proofOfRecoveryInDays > 0) {
      badges.push({
        label: t('restriction.testing.badges.recoveryCertificate'),
        color: 'positive',
      })
    }

    return badges
  }

  get caption(): string {
    const caption = [
      t(`restriction.testing.caption.pcr.${this.restriction.testRequired}`, {
        hrs: this.destination.testValidityInHours,
      }),
    ]

    if (!this.restriction.testRequired) {
      if (this.destination.proofOfRecoveryInDays > 0) {
        caption.push(
          t(
            `restriction.testing.caption.proof.${this.destination.proofOfRecoveryInDays > 0}`,
            {
              days: this.destination.proofOfRecoveryInDays,
            },
          ),
        )
      }

      if (this.destination.testOnArrival) {
        caption.push(t('restriction.testing.caption.testOnArrival'))
      }
    }

    return caption.join(' ')
  }
}
