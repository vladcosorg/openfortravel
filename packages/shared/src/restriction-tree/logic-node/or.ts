import type { PlainRestrictionGroups } from '@/shared/src/restriction-tree/types'
import { LogicNodeType } from '@/shared/src/restriction-tree/types'

import { LogicNode } from '../logic-node'

export class Or extends LogicNode {
  id(): LogicNodeType {
    return LogicNodeType.OR
  }

  resolveTreeNodes(): PlainRestrictionGroups {
    return this.children
      .flatMap((child) => child.resolveTreeNodes())

      .map((restrictionGroup) => [...restrictionGroup])
  }
}
