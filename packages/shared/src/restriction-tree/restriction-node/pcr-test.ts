import { useI18nWithPrefix } from '@/shared/src/composables/use-plugins'
import {
  RestrictionCategory,
  RestrictionInstruction,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

const { t } = useI18nWithPrefix<string>('rt.pcrTest')
export class PcrTest extends RestrictionNode {
  constructor(public readonly options: { hours: number; languages: string[] }) {
    super()
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.PCR_TEST
  }

  category(): RestrictionCategory {
    return RestrictionCategory.ACTION
  }
  displayOrder(): number {
    return 3
  }

  penaltyScore(): number {
    return 2
  }

  instruction(): RestrictionInstruction {
    return {
      title: t('instruction.heading'),
      subtitle: t('instruction.subtitle', { hours: this.options.hours }),
    }
  }
}
