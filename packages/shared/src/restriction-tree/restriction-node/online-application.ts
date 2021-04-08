import { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class OnlineApplication extends RestrictionNode {
  constructor(protected options: { url: string }) {
    super()
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.ONLINE_APPLICATION
  }
}
