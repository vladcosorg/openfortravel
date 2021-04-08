import { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class QuarantineWithTesting extends RestrictionNode {
  constructor(protected options: { days: number }) {
    super()
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.QUARANTINE_WITH_TEST
  }
}
