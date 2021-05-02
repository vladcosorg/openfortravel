import { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class RecoveryCertificate extends RestrictionNode<
  typeof RecoveryCertificate.defaultOptions
> {
  public static defaultOptions = {
    daysAtLeast: 14,
    daysAtMost: 90,
    languages: ['en'] as string[],
    ...RestrictionNode.defaultOptions,
  }

  public penaltyScore(): number {
    return 1
  }

  public id(): RestrictionNodeType {
    return RestrictionNodeType.RECOVERY
  }
}
