import {
  RestrictionCategory,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class Insurance extends RestrictionNode<
  typeof Insurance.defaultOptions
> {
  public static defaultOptions = {
    ...RestrictionNode.defaultOptions,
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
