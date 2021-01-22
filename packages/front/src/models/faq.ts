import { Path, TranslateResult, Values } from 'vue-i18n'

import { Restriction } from '@/shared/src/api/restrictions/models'
import { useVueI18n } from '@/shared/src/composables/use-plugins'
import { getNationalityOrFallback } from '@/shared/src/modules/nationality/nationality-helpers'

const { t } = useVueI18n()

function translateBlock(
  translatePath: Path,
  values: Values,
  branches: Record<string, string | boolean> = {},
): string {
  const result = t(translatePath, values) as string
  if (typeof result === 'object' && !Array.isArray(result)) {
    const out = []
    for (const key of Object.keys(result)) {
      const keyBranch = branches[key]
      if (keyBranch !== undefined) {
        if (!keyBranch) {
          continue
        }
        out.push(t(`${translatePath}.${key}`, values))
      } else {
        out.push(t(`${translatePath}.${key}`, values))
      }
    }
    return out.join('')
  }

  return result
}
type QAItem = {
  question: string | TranslateResult
  answer: string | TranslateResult
}
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
