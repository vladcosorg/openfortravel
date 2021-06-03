import { LogicNode } from '@/shared/src/restriction-tree/logic-node'
import type { PlainRestrictionGroups } from '@/shared/src/restriction-tree/types'
import { LogicNodeType } from '@/shared/src/restriction-tree/types'

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
