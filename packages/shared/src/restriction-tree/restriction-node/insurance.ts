import {
  RestrictionCategory,
  RestrictionInstruction,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class Insurance extends RestrictionNode {
  constructor(
    protected options: {
      customInstructionTitle?: string
      customInstructionSubtitle?: string
    },
  ) {
    super()
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.INSURANCE
  }

  category(): RestrictionCategory {
    return RestrictionCategory.ACTION
  }
  displayOrder(): number {
    return 3
  }

  penaltyScore(): number {
    return 1
  }

  instruction(): RestrictionInstruction {
    return {
      title:
        this.options.customInstructionTitle ??
        'Acquire insurance that covers COVID-19 observation and treatment ',
      subtitle:
        this.options.customInstructionSubtitle ??
        'Upon arrival your are required are required to provide proof of health insurance ' +
          'that covers COVID-19 observation and treatment for the duration of your stay.',
    }
  }
}
