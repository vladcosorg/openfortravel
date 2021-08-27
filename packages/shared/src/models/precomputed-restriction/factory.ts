import { PrecomputedRestriction } from '@/shared/src/models/precomputed-restriction/precomputed-restriction'
import { RawPrecomputedRestriction } from '@/shared/src/models/precomputed-restriction/raw-precomputed-restriction'
import { RestrictionGroup } from '@/shared/src/restriction-tree/restriction-group'

export function createPrecomputedRestriction(
  rawRestriction: RawPrecomputedRestriction,
): PrecomputedRestriction {
  return new PrecomputedRestriction(rawRestriction)
}

export const createRawPrecomputedRestriction = (
  group: RestrictionGroup,
): RawPrecomputedRestriction => ({
  quarantine: group.quarantineRequired,
  pcrTest: group.pcrTestRequired,
  rating: group.penaltyScore,
  status: group.status,
})
