import type {
  RestrictionInstruction} from '@/shared/src/restriction-tree/restriction-node';
import {
  RestrictionCategory,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

type Options = typeof Age.defaultOptions
export class Age extends RestrictionNode<Options> {
  public static defaultOptions = {
    age: 6,
    orMore: false,
    ...RestrictionNode.defaultOptions,
  }

  protected getDefaults(): Options {
    return Age.defaultOptions
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
