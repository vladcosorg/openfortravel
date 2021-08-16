import { AbstractRestrictionNode } from '@/shared/src/restriction-tree/abstract-restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class SubDestination extends AbstractRestrictionNode<
  typeof SubDestination.defaultOptions
> {
  public static defaultOptions = {
    subDestinations: [] as string[],
    ...AbstractRestrictionNode.defaultOptions,
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.SUB_DESTINATION
  }
}
