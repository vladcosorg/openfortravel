import {
  RestrictionCategory,
  AbstractRestrictionNode,
} from '@/shared/src/restriction-tree/abstract-restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class OnlineApplication extends AbstractRestrictionNode<
  typeof OnlineApplication.defaultOptions
> {
  static defaultOptions = {
    url: '',
    hoursBeforeArrival: undefined as number | undefined,
    ...AbstractRestrictionNode.defaultOptions,
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
