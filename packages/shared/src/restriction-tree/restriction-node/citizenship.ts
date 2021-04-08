import { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class Citizenship extends RestrictionNode {
  constructor(protected readonly allowedCitizenship: string[]) {
    super()
  }

  matches(value: string): boolean {
    return this.allowedCitizenship.includes(value)
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.CITIZENSHIP
  }
}
