import { outlinedLocalPolice as borderIcon } from '@quasar/extras/material-icons-outlined'

import { Restriction } from '@/front/src/models/restriction'
import type { VisitedCountryQuestion } from '@/front/src/pages/destination/questions/items/visited-country-question'
import { SummaryItem } from '@/front/src/pages/destination/summary-items/summary-item'
import { getCurrentRelativeURL } from '@/front/src/router/helpers'
import type { Destination } from '@/shared/src/api/destinations/models'
import { RestrictionStatus } from '@/shared/src/api/restrictions/models'
import { useVueI18n } from '@/shared/src/composables/use-plugins'

const { t } = useVueI18n<string>()
export class StatusSummary extends SummaryItem {
  constructor(
    protected readonly restriction: Restriction,
    protected readonly destination: Destination,
    protected readonly visiteCountryQuestion: VisitedCountryQuestion,
  ) {
    super(restriction, destination)
  }
  protected readonly statusMap = {
    [RestrictionStatus.ALLOWED]: '',
    [RestrictionStatus.CONDITIONAL]: 'text-warning',
    [RestrictionStatus.FORBIDDEN]: 'text-negative',
    [RestrictionStatus.ALLOWED_SOON]: 'text-info',
  }
  label = t('restriction.travel.label')

  value = t(`restriction.travel.value.${this.restriction.status}`)

  get caption(): string {
    const caption = [
      t(`restriction.travel.caption.intro.${this.restriction.status}`),
    ]

    if (this.destination.visitedRestrictedCountriesDaysAgo > 0) {
      caption.push(
        t('restriction.travel.caption.relatedRestrictions', {
          url: getCurrentRelativeURL(this.visiteCountryQuestion.id),
          days: this.destination.visitedRestrictedCountriesDaysAgo,
        }),
      )
    }

    return caption.join(' ')
  }

  icon = borderIcon

  public get valueClasses(): string {
    return this.statusMap[this.restriction.status]
  }

  get disabled(): boolean {
    return false
  }
}
