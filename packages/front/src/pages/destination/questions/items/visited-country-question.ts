import { generateStringSequenceFromList } from '@/front/src/misc/misc'
import { Question } from '@/front/src/pages/destination/questions/question'
import { useI18nWithPrefix } from '@/shared/src/composables/use-plugins'
import { useVuexRawGetter } from '@/shared/src/composables/use-vuex'

const { t } = useI18nWithPrefix<string>('faq.recentlyVisited')
export class VisitedCountryQuestion extends Question {
  get id(): string {
    return 'related-countries'
  }

  get question(): string {
    return t('question', {
      destination: this.destination.name,
    })
  }

  get answer(): string {
    if (this.destination.visitedRestrictedCountriesDaysAgo > 0) {
      const countries = useVuexRawGetter<string[]>(
        'destinationPage/relatedRestrictionForbiddenStringList',
      )

      if (countries.length > 0) {
        return t('answer.yes', {
          countries: generateStringSequenceFromList(countries, 'b'),
          days: this.destination.visitedRestrictedCountriesDaysAgo,
          destination: this.destination.name,
        })
      }
    }

    return t('answer.no', {
      destination: this.destination.name,
    })
  }

  get skip(): boolean {
    return this.restriction.isForbidden
  }
}
