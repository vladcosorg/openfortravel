import { Destination } from '@/shared/src/api/destinations/models'
import { RestrictionGroupCollection } from '@/shared/src/restriction-tree/restriction-group'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

export function createCollection(
  country: Destination,
  profile: VisitorProfile,
  inverseOrigin = false,
): RestrictionGroupCollection {
  return new RestrictionGroupCollection(
    country.restrictions,
    inverseOrigin
      ? Object.assign({}, profile, {
          [RestrictionNodeType.ORIGIN]: country.countryCode,
        })
      : profile,
  )
}
