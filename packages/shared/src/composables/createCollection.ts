import { Destination } from '@/shared/src/api/destinations/models'
import { ProfileContext } from '@/shared/src/models/profile-context/profile-context'
import { RestrictionGroupCollection } from '@/shared/src/restriction-tree/restriction-group'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export function createCollection(
  country: Destination,
  profile: ProfileContext,
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
