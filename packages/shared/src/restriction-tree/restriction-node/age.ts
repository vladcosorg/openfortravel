import {
  CommonOptions,
  RestrictionCategory,
  RestrictionInstruction,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class Age extends RestrictionNode {
  constructor(
    protected options: { age: number; orMore: boolean } & CommonOptions,
  ) {
    super()
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.AGE
  }

  category(): RestrictionCategory {
    return RestrictionCategory.PREREQUISITE
  }
  displayOrder(): number {
    return 3
  }

  penaltyScore(): number {
    return 0
  }

  matches(value: number): boolean {
    return !this.options.orMore
      ? this.options.age >= value
      : this.options.age <= value
  }

  instruction(): RestrictionInstruction {
    return {
      title: `Required age is ${this.options.age} or ${
        !this.options.orMore ? 'less' : 'more'
      }`,
      subtitle: '',
    }
  }
}
