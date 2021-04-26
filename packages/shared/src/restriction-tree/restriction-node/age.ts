import {
  CommonOptions,
  RestrictionCategory,
  RestrictionInstruction,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class Age extends RestrictionNode {
  constructor(protected options: { age: number } & CommonOptions) {
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
    return this.options.age >= value
  }

  instruction(): RestrictionInstruction {
    console.log(this)
    return {
      title: `Required age is ${this.options.age} or less`,
      subtitle: '',
    }
  }
}
