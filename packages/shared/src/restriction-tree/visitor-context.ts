import { typeConstructors } from '@/shared/src/restriction-tree/converter'
import { Matcher } from '@/shared/src/restriction-tree/matcher'
import {
  PlainRestrictionGroups,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

export type VisitorContextType = {
  [key in RestrictionNodeType]?: Parameters<
    InstanceType<typeof typeConstructors[key]>['matches']
  >[0]
}

export function applyContextToRestrictionGroups(
  context: VisitorContextType,
  groups: PlainRestrictionGroups,
): Matcher {
  let matcher = new Matcher(groups)
    .withOptional(
      RestrictionNodeType.ORIGIN,
      context[RestrictionNodeType.ORIGIN],
    )
    .withOptional(
      RestrictionNodeType.CITIZENSHIP,
      context[RestrictionNodeType.CITIZENSHIP],
    )
    .withOptional(RestrictionNodeType.AGE, context[RestrictionNodeType.AGE])
    .withOptional(RestrictionNodeType.DID_NOT_VISIT_COUNTRIES, [])

  if (!context[RestrictionNodeType.VACCINATED]) {
    matcher = matcher.withAbsenceOf(RestrictionNodeType.VACCINATED)
  }

  return matcher
}

export class VisitorContext {
  public [RestrictionNodeType.ORIGIN]: string
  public [RestrictionNodeType.CITIZENSHIP]: string
  public [RestrictionNodeType.VACCINATED] = false
  public [RestrictionNodeType.AGE] = 21

  constructor(protected readonly context: VisitorContextType) {
    this[RestrictionNodeType.ORIGIN] = context[RestrictionNodeType.ORIGIN]

    if (context[RestrictionNodeType.AGE] !== undefined) {
      this[RestrictionNodeType.AGE] = context[RestrictionNodeType.AGE]
    }

    if (!context[RestrictionNodeType.CITIZENSHIP]) {
      this[RestrictionNodeType.CITIZENSHIP] = this[RestrictionNodeType.ORIGIN]
    } else {
      this[RestrictionNodeType.CITIZENSHIP] =
        context[RestrictionNodeType.CITIZENSHIP]
    }

    if (context[RestrictionNodeType.VACCINATED]) {
      this[RestrictionNodeType.VACCINATED] =
        context[RestrictionNodeType.VACCINATED]
    }
  }

  applyToMatcher(matcher: Matcher): Matcher {
    matcher = matcher
      .withOptional(
        RestrictionNodeType.ORIGIN,
        this[RestrictionNodeType.ORIGIN],
      )
      .withOptional(
        RestrictionNodeType.CITIZENSHIP,
        this[RestrictionNodeType.CITIZENSHIP],
      )
      .withOptional(RestrictionNodeType.AGE, this[RestrictionNodeType.AGE])
      .withOptional(RestrictionNodeType.DID_NOT_VISIT_COUNTRIES, [])

    if (!this[RestrictionNodeType.VACCINATED]) {
      matcher = matcher.withAbsenceOf(RestrictionNodeType.VACCINATED)
    }

    return matcher
  }
}
