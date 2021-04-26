import { useI18nWithPrefix } from '@/shared/src/composables/use-plugins'
import { getLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'
import {
  RestrictionInstruction,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorContext } from '@/shared/src/restriction-tree/visitor-context'

const { t } = useI18nWithPrefix('rt.vaccinated')
export class Vaccinated extends RestrictionNode {
  constructor(protected readonly options: { daysAgo: number }) {
    super()
  }

  matches(userValue: number): boolean {
    return userValue >= this.options.daysAgo
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.VACCINATED
  }

  instruction(context: VisitorContext): RestrictionInstruction {
    return {
      title: t('instruction.heading', {
        origin: getLabelForCountryCode(context.origin),
      }) as string,
      subtitle: t('instruction.subtitle') as string,
    }
  }
}
