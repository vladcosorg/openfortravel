import intersection from 'lodash/intersection'

import { useI18nWithPrefix } from '@/shared/src/composables/use-plugins'
import { getOriginLabels } from '@/shared/src/modules/country-list/country-list-helpers'
import { generateCountryAndAreaSequence } from '@/shared/src/restriction-tree/misc'
import {
  RestrictionInstruction,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

const { t } = useI18nWithPrefix<string>('rt.didNotVisitCountries')
type Options = { countryCodes: string[]; days: number }

export class DidNotVisitCountries extends RestrictionNode<Options> {
  protected getDefaults(): Options {
    return {
      countryCodes: [],
      days: 0,
    }
  }

  matches(userVisitedCountries: string[]): boolean {
    if (userVisitedCountries.length === 0) {
      return true
    }

    return (
      intersection(this.options.countryCodes, userVisitedCountries).length === 0
    )
  }

  displayOrder(): number {
    return -1
  }

  penaltyScore(): number {
    return 1
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.DID_NOT_VISIT_COUNTRIES
  }

  instruction(): RestrictionInstruction {
    return {
      title: t('instruction.heading', { days: this.options.days }),
      subtitle: t('instruction.subtitle', {
        days: this.options.days,
        sequence: generateCountryAndAreaSequence(
          this.options.countryCodes,
          getOriginLabels(),
        ),
      }),
    }
  }
}
