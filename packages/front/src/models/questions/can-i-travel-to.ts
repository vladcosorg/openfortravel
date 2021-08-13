import type { Restriction } from '@/shared/src/api/restrictions/models'
import { useVueI18n } from '@/shared/src/composables/use-plugins'
import { getNationalityOrFallback } from '@/shared/src/modules/nationality/nationality-helpers'

import { translateBlock } from '@/front/src/models/faq'
import type { QAItem } from '@/front/src/models/faq'

const { t } = useVueI18n()
export function canITravelToCountry(restriction: Restriction): QAItem {
  return {
    question: t('faq.canITravelToCountry.question', {
      origin: restriction.originLabel,
      destination: restriction.destinationLabel,
    }),
    answer: translateBlock(
      `faq.canITravelToCountry.answer.${restriction.status}`,
      {
        origin: restriction.originLabel,
        destination: restriction.destinationLabel,
        nationality: getNationalityOrFallback(restriction.destination),
        quarantine: restriction.selfIsolation,
      },
      {
        testRequired:
          restriction.testRequired && !restriction.needsSelfIsolation(),
        quarantine:
          restriction.needsSelfIsolation() && !restriction.testRequired,
        testOrQuarantine:
          restriction.testRequired && restriction.needsSelfIsolation(),
      },
    ),
  }
}
