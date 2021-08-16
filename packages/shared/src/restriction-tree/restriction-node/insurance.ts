import {
  RestrictionCategory,
  AbstractRestrictionNode,
} from '@/shared/src/restriction-tree/abstract-restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class Insurance extends AbstractRestrictionNode<
  typeof Insurance.defaultOptions
> {
  public static defaultOptions = {
    ...AbstractRestrictionNode.defaultOptions,
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
}
