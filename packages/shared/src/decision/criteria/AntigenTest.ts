import { AbstractCriterionNode } from '@/shared/src/decision/AbstractCriterionNode'
import { CriteriaMap } from '@/shared/src/decision/DecisionTree'

export class AntigenTest extends AbstractCriterionNode {
  constructor(protected readonly hours: number = 24) {
    super()
  }

  resolveWithData(_data: CriteriaMap): boolean {
    return true
  }

  verbalize(): string {
    return `you need to have antigen test taken at least ${this.hours}`
  }

  matches(value: number): boolean {
    return value >= this.hours
  }
}
