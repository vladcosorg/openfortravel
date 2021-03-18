import { VisitedCountryQuestion } from '@/front/src/pages/destination/questions/items/visited-country-question'
import { Question } from '@/front/src/pages/destination/questions/question'
import { getCurrentRelativeURL } from '@/front/src/router/helpers'
import { Destination } from '@/shared/src/api/destinations/models'
import { Restriction, RestrictionStatus } from '@/shared/src/api/restrictions/models'
import { useI18nWithPrefix } from '@/shared/src/composables/use-plugins'
import { getNationalityOrFallback } from '@/shared/src/modules/nationality/nationality-helpers'

const { t } = useI18nWithPrefix<string>('faq.canITravelToCountry')
export class GeneralQuestion extends Question {
  constructor(
    protected readonly restriction: Restriction,
    protected readonly destination: Destination,
    protected readonly visitedCountryQuestion: VisitedCountryQuestion,
  ) {
    super(restriction, destination)
  }
  get id(): string {
    return `can-travel-from-${this.restriction.originSlug}-to-${this.restriction.destinationSlug}`
  }
  get question(): string {
    return t('question', {
      origin: this.restriction.originLabel,
      destination: this.restriction.destinationLabel,
    })
  }

  get answer(): string {
    const answer: string[] = []
    const vars = {
      origin: this.restriction.originLabel,
      destination: this.restriction.destinationLabel,
      nationality: getNationalityOrFallback(this.restriction.destination),
      quarantine: this.destination.selfIsolationInDays,
    }

    if (this.restriction.status === RestrictionStatus.FORBIDDEN) {
      answer.push(t('answer.status.forbidden', vars))
    } else {
      answer.push(...this.getConditionalDescription(vars))
    }

    if (this.destination.visitedRestrictedCountriesDaysAgo > 0) {
      answer.push(
        t('answer.relatedRestrictions', {
          days: this.destination.visitedRestrictedCountriesDaysAgo,
          url: getCurrentRelativeURL(this.visitedCountryQuestion.id),
        }),
      )
    }

    return answer.join(' ')
  }

  protected getConditionalDescription(vars: Record<string, unknown>): string[] {
    const answer: string[] = []
    answer.push(t('answer.status.conditional.intro', vars))

    if (this.restriction.testRequired && !this.restriction.needsSelfIsolation()) {
      answer.push(t('answer.status.conditional.testRequired.true', vars))
    } else if (this.restriction.needsSelfIsolation() && !this.restriction.testRequired) {
      answer.push(t('answer.status.conditional.quarantine', vars))
    } else if (this.restriction.testRequired && this.restriction.needsSelfIsolation()) {
      answer.push(t('answer.status.conditional.testOrQuarantine', vars))
    } else {
      answer.push(t('answer.status.conditional.testRequired.false', vars))
    }
    return answer
  }
}
