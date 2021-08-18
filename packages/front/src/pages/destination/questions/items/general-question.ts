import { h } from 'vue'

import CountryLabel from '@/front/src/components/country/country-label.vue'
import { OneWayTripCard } from '@/front/src/models/one-way-trip-card'
import { Question } from '@/front/src/pages/destination/questions/question'
import { getCurrentRelativeURL } from '@/front/src/router/helpers'
import { RestrictionStatus } from '@/shared/src/api/restrictions/models'
import { RenderFunction } from '@/shared/src/misc/type-helpers'
import { getNationalityOrFallback } from '@/shared/src/modules/nationality/nationality-helpers'

export class GeneralQuestion extends Question {
  constructor(
    public readonly trip: OneWayTripCard,
    protected readonly returning = false,
  ) {
    super(trip)
  }

  get id(): string {
    return `can-i-${this.returning ? 'return' : 'travel'}-to-${
      this.trip.destination.destinationSlug
    }-from-${this.trip.origin.originSlug}`
  }
  get question(): RenderFunction {
    return () => [
      `Can I ${this.returning ? ' return back ' : ' travel'} from `,
      h(CountryLabel, { value: this.trip.originISO }),
      ' to ',
      h(CountryLabel, { value: this.trip.destinationISO }),
      '?',
    ]
  }

  get answer(): RenderFunction {
    const answer: string[] = []
    return () => 'dddd'
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

    if (
      this.restriction.testRequired &&
      !this.restriction.needsSelfIsolation()
    ) {
      answer.push(t('answer.status.conditional.testRequired.true', vars))
    } else if (
      this.restriction.needsSelfIsolation() &&
      !this.restriction.testRequired
    ) {
      answer.push(t('answer.status.conditional.quarantine', vars))
    } else if (
      this.restriction.testRequired &&
      this.restriction.needsSelfIsolation()
    ) {
      answer.push(t('answer.status.conditional.testOrQuarantine', vars))
    } else {
      answer.push(t('answer.status.conditional.testRequired.false', vars))
    }
    return answer
  }
}
