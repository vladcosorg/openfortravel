import { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class RecoveryCertificate extends RestrictionNode {
  constructor(protected options: { daysLimit: number }) {
    super()
  }

  matches(userValue: number): boolean {
    return userValue <= this.options.daysLimit
  }
  id(): RestrictionNodeType {
    return RestrictionNodeType.RECOVERY
  }
}
