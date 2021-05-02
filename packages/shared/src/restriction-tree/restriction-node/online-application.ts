import {
  RestrictionCategory,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

type Options = typeof OnlineApplication.defaultOptions
export class OnlineApplication extends RestrictionNode<Options> {
  static defaultOptions = {
    url: '',
    ...RestrictionNode.defaultOptions,
  }

  protected getDefaults(): Options {
    return OnlineApplication.defaultOptions
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
