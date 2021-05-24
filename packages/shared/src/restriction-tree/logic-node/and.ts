import { LogicNode } from '@/shared/src/restriction-tree/logic-node'
import type { PlainRestrictionGroups } from '@/shared/src/restriction-tree/types'
import { LogicNodeType } from '@/shared/src/restriction-tree/types'

export class And extends LogicNode {
  id(): LogicNodeType {
    return LogicNodeType.AND
  }

  resolveTreeNodes(): PlainRestrictionGroups {
    const result = this.children.map((child) => child.resolveTreeNodes())
    return (cartesianProduct(result) as unknown) as PlainRestrictionGroups
  }
}

function cartesianProduct<T>(arr: T[][]): T[][] {
  return arr.reduce(
    // eslint-disable-next-line unicorn/prefer-spread
    (a, b) =>
      a.map((x) => b.map((y) => x.concat(y))).reduce((c, d) => c.concat(d), []),
    [[]] as T[][],
  )
}
