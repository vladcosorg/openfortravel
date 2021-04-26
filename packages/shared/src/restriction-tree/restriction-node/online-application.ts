import { useI18nWithPrefix } from '@/shared/src/composables/use-plugins'
import { getLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'
import {
  RestrictionCategory,
  RestrictionInstruction,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorContext } from '@/shared/src/restriction-tree/visitor-context'

const { t } = useI18nWithPrefix('rt.onlineApplication')
export class OnlineApplication extends RestrictionNode {
  constructor(protected options: { url: string }) {
    super()
  }

  displayOrder(): number {
    return 30
  }

  penaltyScore(): number {
    return 1
  }

  category(): RestrictionCategory {
    return RestrictionCategory.ACTION
  }

  instruction(context: VisitorContext): RestrictionInstruction {
    return {
      title: t('instruction.heading', {
        origin: getLabelForCountryCode(context.origin),
      }) as string,
      subtitle: t('instruction.subtitle', {
        url: this.options.url,
      }) as string,
    }
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.ONLINE_APPLICATION
  }
}
