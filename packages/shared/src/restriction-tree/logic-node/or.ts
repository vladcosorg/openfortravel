import { LogicNode } from '@/shared/src/restriction-tree/logic-node'
import type { RestrictionGroups } from '@/shared/src/restriction-tree/types';
import { LogicNodeType } from '@/shared/src/restriction-tree/types'

export class Or extends LogicNode {
  id(): LogicNodeType {
    return LogicNodeType.OR
  }

  resolveTreeNodes(): RestrictionGroups {
    return this.children
      .map((child) => child.resolveTreeNodes())
      .flat()
      .map((restrictionGroup) => [...restrictionGroup])
  }
}
