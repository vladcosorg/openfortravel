import { Question } from '@/front/src/pages/destination/questions/question'
import { useI18nWithPrefix } from '@/shared/src/composables/use-plugins'

const { t } = useI18nWithPrefix<string>('faq.return')
export class ReturnQuestion extends Question {
  get id(): string {
    return `can-i-return-from-${this.restriction.originSlug}-to-${this.restriction.destinationSlug}-no-quarantine`
  }
  get question(): string {
    return t('question', {
      origin: this.restriction.originLabel,
      destination: this.restriction.destinationLabel,
    })
  }

  get answer(): string {
    const returnRestriction = this.destinationObject.getReturnRestriction()
    if (returnRestriction.isAllowed()) {
      return t('answer.yes', {
        origin: this.restriction.originLabel,
        destination: this.restriction.destinationLabel,
      })
    }

    return t('answer.no', {
      destination: this.destination.name,
    })
  }
}
