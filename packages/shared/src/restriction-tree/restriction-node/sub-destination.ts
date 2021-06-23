import { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class SubDestination extends RestrictionNode<
  typeof SubDestination.defaultOptions
> {
  public static defaultOptions = {
    subDestinations: [] as string[],
    ...RestrictionNode.defaultOptions,
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.SUB_DESTINATION
  }
}
