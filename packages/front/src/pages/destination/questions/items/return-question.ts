import { Question } from '@/front/src/pages/destination/questions/question'
import type { Restriction } from '@/shared/src/api/restrictions/models'
import { useI18nWithPrefix } from '@/shared/src/composables/use-plugins'
import { useVuexRawGetter } from '@/shared/src/composables/use-vuex'

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
    const returnRestriction = useVuexRawGetter<Restriction>(
      'destinationPage/returnRestriction',
    )
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

  get skip(): boolean {
    return this.restriction.isForbidden
  }
}
