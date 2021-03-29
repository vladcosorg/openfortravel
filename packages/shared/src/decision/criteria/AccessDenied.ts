import { AbstractCriterionNode } from '@/shared/src/decision/AbstractCriterionNode'

export class AccessDenied extends AbstractCriterionNode {
  verbalize(): string {
    return 'denied'
  }

  matches(value: string): boolean {
    return true
  }
}
