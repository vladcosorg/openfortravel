import { RestrictionGroup } from '@/shared/src/restriction-tree/restriction-group'

export type RoundTripRestrictionGroup = {
  outgoing: RestrictionGroup
  return: RestrictionGroup
}
