import type { typeConstructors } from '@/shared/src/restriction-tree/converter'
import type {
  PlainRestrictionGroups,
  CriteriaMap,
  PlainRestrictionGroup,
  RestrictionNodeType,
  LogicNodeType,
} from '@/shared/src/restriction-tree/types'

type RestrictionConstructors<T extends RestrictionNodeType> = Exclude<
  typeof typeConstructors[T],
  LogicNodeType
>
type Method<T extends RestrictionNodeType> = InstanceType<
  RestrictionConstructors<T>
>['matches']
export type RestrictionNodeTypeValue<T extends RestrictionNodeType> =
  Parameters<Method<T>>[0]

export class Matcher implements IterableIterator<PlainRestrictionGroup> {
  private pointer = 0

  constructor(protected data: PlainRestrictionGroups) {}

  withOptional<T extends RestrictionNodeType>(
    criteriaType: T,
    criteriaValue: RestrictionNodeTypeValue<T>,
  ): Matcher {
    return this.withOptionalCriteria(new Map([[criteriaType, criteriaValue]]))
  }

  withRequired<T extends RestrictionNodeType>(
    criteriaType: T,
    criteriaValue: RestrictionNodeTypeValue<T>,
  ): Matcher {
    return this.withRequiredCriteria(new Map([[criteriaType, criteriaValue]]))
  }

  withPresenceOf(...requiredRestrictions: RestrictionNodeType[]): Matcher {
    return new Matcher(
      this.data.filter((restrictionGroup) =>
        restrictionGroup.some((restriction) =>
          requiredRestrictions.includes(restriction.id()),
        ),
      ),
    )
  }

  withAbsenceOf(...requiredRestrictions: RestrictionNodeType[]): Matcher {
    return new Matcher(
      this.data.filter((restrictionGroup) =>
        restrictionGroup.every(
          (restriction) => !requiredRestrictions.includes(restriction.id()),
        ),
      ),
    )
  }

  hasGroups(): boolean {
    return this.data.length > 0
  }

  protected withOptionalCriteria(filter: CriteriaMap): Matcher {
    return this.withCriteria(filter, true)
  }

  protected withRequiredCriteria(filter: CriteriaMap): Matcher {
    return this.withCriteria(filter, false)
  }

  mergeWithMatcher(matcher: Matcher): Matcher {
    return new Matcher([...this, ...matcher])
  }

  includeCriterionByType(...criterionType: RestrictionNodeType[]): Matcher {
    return new Matcher(
      this.data
        .map((restrictionGroup) =>
          restrictionGroup.filter((criterion) =>
            criterionType.includes(criterion.id()),
          ),
        )
        .filter((group) => group.length),
    )
  }

  excludeCriterionByType(...criterionType: RestrictionNodeType[]): Matcher {
    return new Matcher(
      this.data
        .map((restrictionGroup) =>
          restrictionGroup.filter(
            (criterion) => !criterionType.includes(criterion.id()),
          ),
        )
        .filter((group) => group.length),
    )
  }

  protected withCriteria(filter: CriteriaMap, isOptional: boolean): Matcher {
    return new Matcher(
      this.data.filter((restrictionGroup) =>
        this.matchAgainstGroup(restrictionGroup, filter, isOptional),
      ),
    )
  }

  protected matchAgainstGroup(
    restrictionSet: PlainRestrictionGroups extends ReadonlyArray<infer T>
      ? T
      : never,
    filter: CriteriaMap,
    unmatchedValue: boolean,
  ): boolean {
    return [...filter].every(([key, criteriaValue]) => {
      if (typeof criteriaValue === 'boolean') {
        let found = false
        for (const restriction of restrictionSet) {
          if (restriction.id() === key) {
            found = true
            break
          }
        }

        return criteriaValue === found
      }

      for (const restriction of restrictionSet) {
        if (restriction.id() === key) {
          return restriction.matches(criteriaValue)
        }
      }

      return unmatchedValue
    })
  }

  getGroups(): PlainRestrictionGroups {
    return [...this.data]
  }

  public next(): IteratorResult<PlainRestrictionGroup> {
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

  [Symbol.iterator](): IterableIterator<PlainRestrictionGroup> {
    return this
  }
}
