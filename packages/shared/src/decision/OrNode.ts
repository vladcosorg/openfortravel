import {
  Combinations,
  CriteriaMap,
  ITreeNode,
  NodeChildren,
  TreeNode,
} from '@/shared/src/decision/DecisionTree'

export class OrNode extends TreeNode implements ITreeNode {
  resolveWithData(data: CriteriaMap): NodeChildren | undefined {
    const matchedCriteria = []

    for (const nodeOrCriteria of this.children) {
      if (nodeOrCriteria instanceof TreeNode) {
        matchedCriteria.push(nodeOrCriteria.resolveWithData(data))
      } else {
        const resolved = nodeOrCriteria.resolveWithData(data)

        if (resolved === false) {
          // eslint-disable-next-line unicorn/no-useless-undefined
          matchedCriteria.push(undefined)
        } else {
          matchedCriteria.push(nodeOrCriteria)
        }
      }
    }

    if (!matchedCriteria.some((node) => node !== undefined)) {
      return
    }

    return matchedCriteria.filter((node) => node !== undefined).flat()
  }

  verbalize(): string {
    return this.children.map((child) => child.verbalize()).join(' or ')
  }

  generateCombinations(): Combinations {
    return this.children
      .map((child) => child.generateCombinations())
      .flat()
      .map((restrictionGroup) => [...restrictionGroup])
  }
}
