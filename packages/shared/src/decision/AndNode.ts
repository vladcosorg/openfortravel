import {
  Combinations,
  CriteriaMap,
  ITreeNode,
  NodeChildren,
  TreeNode,
} from '@/shared/src/decision/DecisionTree'

export class AndNode extends TreeNode implements ITreeNode {
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

    if (!matchedCriteria.every((node) => node !== undefined)) {
      return
    }

    return matchedCriteria.filter((node) => node !== undefined).flat()
  }

  //
  // verbalize(): string {
  //   return this.children.map((child) => child.verbalize()).join(' and ')
  // }

  generateCombinations(): Combinations {
    const result = this.children.map((child) => child.generateCombinations())
    return (cartesianProduct(result) as unknown) as Combinations
  }
}

function cartesianProduct<T>(arr: T[][]): T[][] {
  return arr.reduce(
    // eslint-disable-next-line unicorn/prefer-spread
    (a, b) => a.map((x) => b.map((y) => x.concat(y))).reduce((c, d) => c.concat(d), []),
    [[]] as T[][],
  )
}
