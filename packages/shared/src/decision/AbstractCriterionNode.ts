import {
  Combinations,
  CriteriaMap,
  CriteriaValue,
  ITreeNode,
} from '@/shared/src/decision/DecisionTree'

export abstract class AbstractCriterionNode implements ITreeNode {
  generateCombinations(): Combinations {
    return [[this]]
  }

  resolveWithData(filter: CriteriaMap): boolean | undefined {
    return
  }

  abstract matches(value: CriteriaValue): boolean
}
