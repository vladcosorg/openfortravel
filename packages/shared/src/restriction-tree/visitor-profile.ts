import { ProfileContext } from '@/shared/src/models/profile-context/profile-context'
import { Matcher } from '@/shared/src/restriction-tree/matcher'
import {
  PlainRestrictionGroups,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

export function applyContextToRestrictionGroups(
  profile: ProfileContext,
  groups: PlainRestrictionGroups,
): Matcher {
  return (
    new Matcher(groups)
      .withOptional(
        RestrictionNodeType.ORIGIN,
        profile[RestrictionNodeType.ORIGIN],
      )
      .withOptional(
        RestrictionNodeType.CITIZENSHIP,
        profile[RestrictionNodeType.CITIZENSHIP],
      )
      .withOptional(RestrictionNodeType.AGE, 18)
      // .withOptional(RestrictionNodeType.AGE, profile[RestrictionNodeType.AGE])
      .withOptional(
        RestrictionNodeType.DID_NOT_VISIT_COUNTRIES,
        profile[RestrictionNodeType.DID_NOT_VISIT_COUNTRIES],
      )
      .withOptional(
        RestrictionNodeType.RECOVERY,
        profile[RestrictionNodeType.RECOVERY],
      )
      .withOptional(
        RestrictionNodeType.VACCINATED,
        profile[RestrictionNodeType.VACCINATED],
      )
      .withOptional(
        RestrictionNodeType.VACCINATED,
        profile[RestrictionNodeType.VACCINATED],
      )
  )
}
