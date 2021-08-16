import {
  RestrictionCategory,
  AbstractRestrictionNode,
} from '@/shared/src/restriction-tree/abstract-restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class Age extends AbstractRestrictionNode<typeof Age.defaultOptions> {
  public static defaultOptions = {
    age: 6,
    orMore: false,
    ...AbstractRestrictionNode.defaultOptions,
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.AGE
  }

  category(): RestrictionCategory {
    return RestrictionCategory.PREREQUISITE
  }
  displayOrder(): number {
    return 10
  }

  penaltyScore(): number {
    return 0
  }

  matches(value: number): boolean {
    return !this.options.orMore
      ? this.options.age >= value
      : this.options.age <= value
  }
}
