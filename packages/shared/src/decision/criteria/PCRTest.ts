import { AbstractCriterionNode } from '@/shared/src/decision/AbstractCriterionNode'
import { CriteriaMap } from '@/shared/src/decision/DecisionTree'

export class PCRTest extends AbstractCriterionNode {
  constructor(protected readonly hours: number = 48) {
    super()
  }

  resolveWithData(data: CriteriaMap): boolean {
    if (data.has(PCRTest)) {
      const value = data.get(PCRTest)
      return value === true
    }

    return true
  }

  verbalize(): string {
    return `you need to have PCR test taken at least ${this.hours}`
  }

  matches(value: number): boolean {
    return value >= this.hours
  }
}
