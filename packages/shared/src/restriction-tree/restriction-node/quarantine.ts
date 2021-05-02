import {
  RestrictionCategory,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

type Options = typeof Quarantine.defaultOptions

export class Quarantine extends RestrictionNode<Options> {
  public static defaultOptions = {
    days: 14,
    earlyReleaseDays: 0,
    ...RestrictionNode.defaultOptions,
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.QUARANTINE
  }

  protected getDefaults(): Options {
    return Quarantine.defaultOptions
  }

  category(): RestrictionCategory {
    return RestrictionCategory.ACTION
  }

  displayOrder(): number {
    return 100
  }

  penaltyScore(): number {
    return 10
  }
}
