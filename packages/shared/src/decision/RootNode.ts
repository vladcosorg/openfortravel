import { OrNode } from '@/shared/src/decision/OrNode'
import { CriteriaMap, NodeChildren, TreeNode } from '@/shared/src/decision/DecisionTree'

export class RootNode extends OrNode {
  resolveWithData(data: CriteriaMap): NodeChildren | undefined {
    const matchedCriteria = []

    for (const nodeOrCriteria of this.children) {
      const clonedData = new Map(data)
      if (nodeOrCriteria instanceof TreeNode) {
        const resolved = nodeOrCriteria.resolveWithData(clonedData)

        if (clonedData.size > 0) {
          // eslint-disable-next-line unicorn/no-useless-undefined
          matchedCriteria.push(undefined)
        } else {
          matchedCriteria.push(resolved)
        }
      } else {
        const resolved = nodeOrCriteria.resolveWithData(clonedData)

        if (resolved === false || clonedData.size > 0) {
          // eslint-disable-next-line unicorn/no-useless-undefined
          matchedCriteria.push(undefined)
        } else {
          matchedCriteria.push(nodeOrCriteria)
        }
      }
      console.log(clonedData.size)
    }

    if (!matchedCriteria.some((node) => node !== undefined)) {
      return
    }

    return matchedCriteria.filter((node) => node !== undefined).flat()
  }
}
