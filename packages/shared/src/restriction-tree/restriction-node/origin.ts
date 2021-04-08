import { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class Origin extends RestrictionNode {
  constructor(protected options: { allowedOrigins: string[] }) {
    super()
  }

  matches(value: string): boolean {
    return this.options.allowedOrigins.includes(value)
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.ORIGIN
  }
}
