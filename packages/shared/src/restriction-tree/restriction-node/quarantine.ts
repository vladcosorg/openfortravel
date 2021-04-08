import { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class Quarantine extends RestrictionNode {
  constructor(protected readonly options: { days: number }) {
    super()
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.QUARANTINE
  }
}
