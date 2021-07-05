import {
  RestrictionCategory,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class OnlineApplication extends RestrictionNode<
  typeof OnlineApplication.defaultOptions
> {
  static defaultOptions = {
    url: '',
    hoursBeforeArrival: undefined as number | undefined,
    ...RestrictionNode.defaultOptions,
  }

  displayOrder(): number {
    return 30
  }

  penaltyScore(): number {
    return 1
  }

  category(): RestrictionCategory {
    return RestrictionCategory.ACTION
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.ONLINE_APPLICATION
  }
}
