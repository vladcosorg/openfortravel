import { PrecomputedRestriction } from '@/shared/src/models/precomputed-restriction/precomputed-restriction'

export class RoundtripPrecomputedRestriction {
  constructor(
    public readonly outgoingRestriction: PrecomputedRestriction,
    public readonly returnRestrictions: PrecomputedRestriction,
  ) {}
}
