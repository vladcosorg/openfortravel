import { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class PcrTest extends RestrictionNode {
  constructor(protected options: { hours: number }) {
    super()
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.PCR_TEST
  }
}
