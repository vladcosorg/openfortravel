import { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class Vaccinated extends RestrictionNode {
  constructor(protected readonly options: { daysAgo: number }) {
    super()
  }

  matches(userValue: number): boolean {
    return userValue >= this.options.daysAgo
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.VACCINATED
  }
}
