import type { PlainRestrictionGroups } from '@/shared/src/restriction-tree/types'
import { LogicNodeType } from '@/shared/src/restriction-tree/types'

import { LogicNode } from '../logic-node'

export class And extends LogicNode {
  id(): LogicNodeType {
    return LogicNodeType.AND
  }

  resolveTreeNodes(): PlainRestrictionGroups {
    const result = this.children.map((child) => child.resolveTreeNodes())
    return cartesianProduct(result) as unknown as PlainRestrictionGroups
  }
}

function cartesianProduct<T>(arr: T[][]): T[][] {
  return arr.reduce(
    // eslint-disable-next-line unicorn/prefer-spread
    (a, b) => a.flatMap((x) => b.map((y) => x.concat(y))),
    [[]] as T[][],
  )
}
