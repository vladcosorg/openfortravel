import { Question } from '@/front/src/pages/destination/questions/question'
import { RestrictionStatus } from '@/shared/src/api/restrictions/models'
import { useI18nWithPrefix } from '@/shared/src/composables/use-plugins'
import { getNationalityOrFallback } from '@/shared/src/modules/nationality/nationality-helpers'

const { t } = useI18nWithPrefix<string>('faq.canITravelToCountry')
export class GeneralQuestion extends Question {
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
      quarantine: this.restriction.selfIsolation,
    }

    if (this.restriction.status != RestrictionStatus.CONDITIONAL) {
      answer.push(t(`answer.status.${this.restriction.status}`, vars))
    } else {
      answer.push(...this.getConditionalDescription(vars))
    }

    if (this.destination.visitedRestrictedCountriesDaysAgo > 0) {
      answer.push(
        t('answer.relatedRestrictions', {
          days: this.destination.visitedRestrictedCountriesDaysAgo,
        }),
      )
    }

    return answer.join(' ')
  }

  protected getConditionalDescription(vars: Record<string, unknown>): string[] {
    const answer: string[] = []
    answer.push(t(`answer.status.${this.restriction.status}.intro`, vars))

    if (
      this.restriction.testRequired &&
      !this.restriction.needsSelfIsolation()
    ) {
      answer.push(
        t(`answer.status.${this.restriction.status}.testRequired`, vars),
      )
    } else if (
      this.restriction.needsSelfIsolation() &&
      !this.restriction.testRequired
    ) {
      answer.push(
        t(`answer.status.${this.restriction.status}.quarantine`, vars),
      )
    } else if (
      this.restriction.testRequired &&
      this.restriction.needsSelfIsolation()
    ) {
      answer.push(
        t(`answer.status.${this.restriction.status}.testOrQuarantine`, vars),
      )
    }
    return answer
  }
}
