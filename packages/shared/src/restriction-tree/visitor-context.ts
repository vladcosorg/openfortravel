import { Matcher } from '@/shared/src/restriction-tree/matcher'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

type VisitorContextType = {
  [RestrictionNodeType.ORIGIN]: string
  [RestrictionNodeType.CITIZENSHIP]: string
  [RestrictionNodeType.VACCINATED]?: boolean
  [RestrictionNodeType.AGE]?: number
}

export class VisitorContext {
  public [RestrictionNodeType.ORIGIN]: string
  public [RestrictionNodeType.CITIZENSHIP]: string
  public [RestrictionNodeType.VACCINATED] = false
  public [RestrictionNodeType.AGE] = 21

  constructor(protected readonly context: VisitorContextType) {
    this[RestrictionNodeType.ORIGIN] = context[RestrictionNodeType.ORIGIN]

    if (context[RestrictionNodeType.AGE] !== undefined) {
      this[RestrictionNodeType.AGE] = context[RestrictionNodeType.AGE] as number
    }

    if (!context[RestrictionNodeType.CITIZENSHIP]) {
      this[RestrictionNodeType.CITIZENSHIP] = this[RestrictionNodeType.ORIGIN]
    } else {
      this[RestrictionNodeType.CITIZENSHIP] =
        context[RestrictionNodeType.CITIZENSHIP]
    }

    if (context[RestrictionNodeType.VACCINATED]) {
      this[RestrictionNodeType.VACCINATED] = context[
        RestrictionNodeType.VACCINATED
      ] as boolean
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
