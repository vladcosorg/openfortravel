import difference from 'lodash/difference'

import { useI18nWithPrefix } from '@/shared/src/composables/use-plugins'
import {
  getCountryCodes,
  getLabelForCountryCode,
  getOriginLabels,
} from '@/shared/src/modules/country-list/country-list-helpers'
import {
  formatAsHighlightedSequence,
  generateCountryAndAreaSequence,
  getAbbrebiationOrCountry,
} from '@/shared/src/restriction-tree/misc'
import {
  RestrictionInstruction,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorContext } from '@/shared/src/restriction-tree/visitor-context'

const { t } = useI18nWithPrefix('rt.citizenship')

export class Citizenship extends RestrictionNode {
  constructor(
    protected options: { allowedCitizenship: string[]; not?: boolean },
  ) {
    super()
  }

  matches(value: string): boolean {
    return this.getAllowedCountries().includes(value)
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.CITIZENSHIP
  }

  public getAllowedCountries(): string[] {
    return this.options.not
      ? difference(getCountryCodes(), this.options.allowedCitizenship)
      : this.options.allowedCitizenship
  }

  instruction(context: VisitorContext): RestrictionInstruction {
    const countryLabelOrArea = getAbbrebiationOrCountry(
      this.options.allowedCitizenship,
      context[RestrictionNodeType.CITIZENSHIP],
    )

    const fullList = formatAsHighlightedSequence(
      this.getAllowedCountries(),
      context[RestrictionNodeType.CITIZENSHIP],
    )

    return {
      title: `If you are a citizen or a permanent resident of ${countryLabelOrArea}`,
      subtitle: `Nationals of ${fullList} meet this criteria`,
    }
    return {
      title: t('instruction.heading', {
        country: getLabelForCountryCode(context.origin),
      }) as string,
      subtitle: t('instruction.subtitle', {
        sequence: generateCountryAndAreaSequence(
          this.getAllowedCountries(),
          getOriginLabels(),
          { compact: true },
        ),
      }) as string,
    }
  }
}
