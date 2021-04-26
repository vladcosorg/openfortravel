import { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class AntigenTest extends RestrictionNode {
  constructor(protected options: { hours: number }) {
    super()
  }

  verbalize(): string {
    return `you need to have antigen test taken at least ${this.options.hours}`
  }

  matches(value: number): boolean {
    return value >= this.options.hours
  }

  penaltyScore(): number {
    return 2
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.ANTIGEN_TEST
  }
}
