import {
  Combinations,
  Criteria,
  CriteriaMap,
  CriteriaType,
  CriteriaValue,
  RestrictionGroup,
} from '@/shared/src/decision/DecisionTree'

export class Matcher implements IterableIterator<RestrictionGroup> {
  private pointer = 0

  constructor(protected data: Combinations) {}

  withOptionalCriterion(criteriaType: Criteria, criteriaValue: CriteriaValue): Matcher {
    return this.withOptionalCriteria(new Map([[criteriaType, criteriaValue]]))
  }

  withRequiredCriterion(criteriaType: Criteria, criteriaValue: CriteriaValue): Matcher {
    return this.withRequiredCriteria(new Map([[criteriaType, criteriaValue]]))
  }

  withOptionalCriteria(filter: CriteriaMap): Matcher {
    return this.withCriteria(filter, true)
  }
  withRequiredCriteria(filter: CriteriaMap): Matcher {
    return this.withCriteria(filter, false)
  }

  excludeCriterionByType(criterionType: CriteriaType): Matcher {
    return new Matcher(
      this.data.map((restrictionGroup) =>
        restrictionGroup.filter((criterion) => criterion.constructor !== criterionType),
      ),
    )
  }

  verbalize() {}

  protected withCriteria(filter: CriteriaMap, isOptional: boolean): Matcher {
    return new Matcher(
      this.data.filter((restrictionGroup) =>
        this.matchAgainstGroup(restrictionGroup, filter, isOptional),
      ),
    )
  }

  protected matchAgainstGroup(
    restrictionSet: Combinations extends readonly (infer T)[] ? T : never,
    filter: CriteriaMap,
    unmatchedValue: boolean,
  ): boolean {
    return [...filter].every(([key, criteriaValue]) => {
      if (typeof criteriaValue === 'boolean') {
        let found = false
        for (const restriction of restrictionSet) {
          if (restriction.constructor === key) {
            found = true
            break
          }
        }

        return criteriaValue === found
      }

      for (const restriction of restrictionSet) {
        if (restriction.constructor === key) {
          return restriction.matches(criteriaValue)
        }
      }

      return unmatchedValue
    })
  }

  public next(): IteratorResult<RestrictionGroup> {
    return this.pointer < this.data.length
      ? {
          done: false,
          value: this.data[this.pointer++],
        }
      : {
          done: true,
          value: undefined,
        }
  }

  [Symbol.iterator](): IterableIterator<RestrictionGroup> {
    return this
  }
}
