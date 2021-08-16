import {
  RestrictionCategory,
  AbstractRestrictionNode,
} from '@/shared/src/restriction-tree/abstract-restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class Quarantine extends AbstractRestrictionNode<
  typeof Quarantine.defaultOptions
> {
  public static defaultOptions = {
    days: 14,
    earlyReleaseDays: 0,
    ...AbstractRestrictionNode.defaultOptions,
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.QUARANTINE
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
