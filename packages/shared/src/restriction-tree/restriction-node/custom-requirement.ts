import {
  RestrictionCategory,
  AbstractRestrictionNode,
} from '@/shared/src/restriction-tree/abstract-restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class CustomRequirement extends AbstractRestrictionNode<
  typeof CustomRequirement.defaultOptions
> {
  static defaultOptions = {
    ...AbstractRestrictionNode.defaultOptions,
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
