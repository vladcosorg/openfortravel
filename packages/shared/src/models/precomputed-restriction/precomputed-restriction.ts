// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { RestrictionStatus } from '@/shared/src/api/restrictions/models'
import { RawPrecomputedRestriction } from '@/shared/src/models/precomputed-restriction/raw-precomputed-restriction'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PrecomputedRestriction extends RawPrecomputedRestriction {}
export class PrecomputedRestriction {
  constructor(rawRestriction: RawPrecomputedRestriction) {
    Object.assign(this, rawRestriction)
  }

  get isForbidden(): boolean {
    return this.status === RestrictionStatus.FORBIDDEN
  }
}
