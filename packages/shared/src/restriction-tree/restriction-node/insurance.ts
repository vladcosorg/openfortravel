import type {
  RestrictionInstruction} from '@/shared/src/restriction-tree/restriction-node';
import {
  RestrictionCategory,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

type Options = typeof Insurance.defaultOptions
export class Insurance extends RestrictionNode<Options> {
  public static defaultOptions = {
    ...RestrictionNode.defaultOptions,
  }

  protected getDefaults(): Options {
    return Insurance.defaultOptions
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
