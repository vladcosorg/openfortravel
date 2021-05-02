import { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

type Options = typeof RecoveryCertificate.defaultOptions
export class RecoveryCertificate extends RestrictionNode<Options> {
  public static defaultOptions = {
    daysAtLeast: 14,
    daysAtMost: 90,
    languages: ['en'] as string[],
    ...RestrictionNode.defaultOptions,
  }

  protected getDefaults(): Options {
    return RecoveryCertificate.defaultOptions
  }

  public penaltyScore(): number {
    return 1
  }

  public id(): RestrictionNodeType {
    return RestrictionNodeType.RECOVERY
  }
}
