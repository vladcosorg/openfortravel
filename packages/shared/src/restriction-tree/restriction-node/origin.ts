import difference from 'lodash/difference'
import without from 'lodash/without'

import { useI18nWithPrefix } from '@/shared/src/composables/use-plugins'
import {
  getCountryCodes,
  getLabelForCountryCode,
  getOriginLabels,
} from '@/shared/src/modules/country-list/country-list-helpers'
import { generateCountryAndAreaSequence } from '@/shared/src/restriction-tree/misc'
import {
  RestrictionInstruction,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorContext } from '@/shared/src/restriction-tree/visitor-context'

const { t } = useI18nWithPrefix('rt.origin')

export class Origin extends RestrictionNode {
  constructor(protected options: { allowedOrigins: string[]; not?: boolean }) {
    super()
  }

  matches(value: string): boolean {
    return this.getAllowedCountries().includes(value)
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.ORIGIN
  }

  protected getAllowedCountries(): string[] {
    return this.options.not
      ? difference(getCountryCodes(), this.options.allowedOrigins)
      : this.options.allowedOrigins
  }

  instruction(context: VisitorContext): RestrictionInstruction {
    return {
      title: t('instruction.heading', {
        origin: getLabelForCountryCode(context.origin),
      }) as string,
      subtitle: t('instruction.subtitle', {
        sequence: generateCountryAndAreaSequence(
          without(this.getAllowedCountries(), context.origin),
          getOriginLabels(),
        ),
      }) as string,
    }
  }
}
