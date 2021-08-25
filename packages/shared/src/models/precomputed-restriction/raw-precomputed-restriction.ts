import { RestrictionStatus } from '@/shared/src/api/restrictions/models'

export type RawPrecomputedRestriction = {
  quarantine: boolean
  pcrTest: boolean
  rating: number
  status: RestrictionStatus
}

type RoundTripRawPrecomputedRestriction = {
  outgoing: RawPrecomputedRestriction
  return: RawPrecomputedRestriction
}
export type RoundTripRawPrecomputedRestrictionMap = Record<
  string,
  RoundTripRawPrecomputedRestriction
>
