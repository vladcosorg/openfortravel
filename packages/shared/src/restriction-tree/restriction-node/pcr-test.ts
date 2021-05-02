import {
  RestrictionCategory,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class PcrTest extends RestrictionNode<typeof PcrTest.defaultOptions> {
  public static defaultOptions = {
    hours: 72,
    languages: ['en'] as string[],
    ...RestrictionNode.defaultOptions,
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.PCR_TEST
  }

  category(): RestrictionCategory {
    return RestrictionCategory.ACTION
  }

  displayOrder(): number {
    return 3
  }

  penaltyScore(): number {
    return 2
  }
}
