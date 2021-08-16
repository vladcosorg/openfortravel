import inRange from 'lodash/inRange'

import { AbstractRestrictionNode } from '@/shared/src/restriction-tree/abstract-restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class RecoveryCertificate extends AbstractRestrictionNode<
  typeof RecoveryCertificate.defaultOptions
> {
  public static defaultOptions = {
    daysAtLeast: 14,
    daysAtMost: 90,
    languages: [] as string[],
    issuer: [] as string[],
    ...AbstractRestrictionNode.defaultOptions,
  }

  public penaltyScore(): number {
    return 1
  }

  matches(recoveredDays?: number): boolean {
    if (!recoveredDays) {
      return false
    }

    return inRange(
      recoveredDays,
      this.options.daysAtLeast,
      this.options.daysAtMost,
    )
  }

  public id(): RestrictionNodeType {
    return RestrictionNodeType.RECOVERY
  }
}
