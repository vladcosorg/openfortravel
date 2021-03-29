import { AbstractCriterionNode } from '@/shared/src/decision/AbstractCriterionNode'
import { CriteriaMap } from '@/shared/src/decision/DecisionTree'

export class Quarantine extends AbstractCriterionNode {
  constructor(protected readonly days: number = 14) {
    super()
  }

  resolveWithData(data: CriteriaMap): boolean | undefined {
    if (!data.has(this.constructor)) {
      return
    }

    const value = data.get(this.constructor)

    if (typeof value === 'boolean') {
      return true
    }

    return value === this.days
  }

  verbalize(): [string, Record<string, string | number>?] {
    return ['quarantine', { days: this.days }]
  }

  matches(value: number): boolean {
    return this.days >= value
  }
}
