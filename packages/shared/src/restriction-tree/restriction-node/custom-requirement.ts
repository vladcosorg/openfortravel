import {
  RestrictionCategory,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class CustomRequirement extends RestrictionNode<
  typeof CustomRequirement.defaultOptions
> {
  static defaultOptions = {
    ...RestrictionNode.defaultOptions,
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

  id(): RestrictionNodeType {
    return RestrictionNodeType.CUSTOM_REQUIREMENT
  }
}
