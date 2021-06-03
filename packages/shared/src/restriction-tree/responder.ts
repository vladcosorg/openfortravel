import type { Matcher } from '@/shared/src/restriction-tree/matcher'
import type { Quarantine } from '@/shared/src/restriction-tree/restriction-node/quarantine'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class Responder {
  constructor(protected readonly initialMatcher: Matcher) {}

  public isEntryAllowed(): boolean {
    return this.initialMatcher.hasGroups()
  }

  public isEntryConditional(): boolean {
    return (
      this.isEntryAllowed() &&
      (this.isTestRequired() || this.isQuarantineRequired())
    )
  }

  public isQuarantineRequired(): boolean {
    return !this.initialMatcher
      .withAbsenceOf(RestrictionNodeType.QUARANTINE)
      .hasGroups()
  }

  public getQuarantineRestrictions(): Quarantine[] {
    return [
      ...this.initialMatcher
        .withPresenceOf(RestrictionNodeType.QUARANTINE)
        .includeCriterionByType(RestrictionNodeType.QUARANTINE),
    ].flat(1)
  }

  public isTestRequired(): boolean {
    return !this.initialMatcher
      .withAbsenceOf(RestrictionNodeType.PCR_TEST)
      .withAbsenceOf(RestrictionNodeType.RECOVERY)
      .hasGroups()
  }
}
