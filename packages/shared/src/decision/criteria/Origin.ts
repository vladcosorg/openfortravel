import { AbstractCriterionNode } from '@/shared/src/decision/AbstractCriterionNode'
import { CriteriaMap } from '@/shared/src/decision/DecisionTree'

export class OriginCriteria extends AbstractCriterionNode {
  constructor(protected readonly allowedOrigins: string[]) {
    super()
  }

  resolveWithData(data: CriteriaMap): boolean | undefined {
    if (data.has(this.constructor as typeof OriginCriteria)) {
      const value = data.get(OriginCriteria) as string
      return this.allowedOrigins.includes(value)
    }

    return
  }

  verbalize(): string {
    return 'allowed countries ' + this.allowedOrigins.join(', ')
  }

  matches(value: string): boolean {
    return this.allowedOrigins.includes(value)
  }
}
