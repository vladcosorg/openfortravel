import { typeConstructors } from '@/shared/src/restriction-tree/converter'
import { Matcher } from '@/shared/src/restriction-tree/matcher'
import {
  PlainRestrictionGroups,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> &
  Pick<T, TRequired>

type MatcherTypes = {
  [key in RestrictionNodeType]: Parameters<
    InstanceType<typeof typeConstructors[key]>['matches']
  >[0]
}
export type VisitorProfile = OptionalExceptFor<
  MatcherTypes,
  RestrictionNodeType.ORIGIN | RestrictionNodeType.CITIZENSHIP
>

const a: VisitorProfile = {
  origin: 'af',
  citizenship: ['da'],
  recovery: 32,
}

export function applyContextToRestrictionGroups(
  profile: VisitorProfile,
  groups: PlainRestrictionGroups,
): Matcher {
  let matcher = new Matcher(groups)
    .withOptional(
      RestrictionNodeType.ORIGIN,
      profile[RestrictionNodeType.ORIGIN],
    )
    .withOptional(
      RestrictionNodeType.CITIZENSHIP,
      profile[RestrictionNodeType.CITIZENSHIP],
    )
    // .withOptional(RestrictionNodeType.AGE, profile[RestrictionNodeType.AGE])
    .withOptional(RestrictionNodeType.DID_NOT_VISIT_COUNTRIES, [])

  if (!profile[RestrictionNodeType.VACCINATED]) {
    matcher = matcher.withAbsenceOf(RestrictionNodeType.VACCINATED)
  }

  return matcher
}
