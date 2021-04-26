import { Matcher } from '@/shared/src/restriction-tree/matcher'
import { Quarantine } from '@/shared/src/restriction-tree/restriction-node/quarantine'
import { QuarantineWithTesting } from '@/shared/src/restriction-tree/restriction-node/quarantine-with-testing'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class Responder {
  constructor(protected readonly initialMatcher: Matcher) {}

  public isEntryAllowed(): boolean {
    return this.initialMatcher.hasGroups()
  }

  public isEntryConditional(): boolean {
    return this.isEntryAllowed() && (this.isTestRequired() || this.isQuarantineRequired())
  }

  public isQuarantineRequired(): boolean {
    return !this.initialMatcher
      .withAbsenceOf(RestrictionNodeType.QUARANTINE)
      .withAbsenceOf(RestrictionNodeType.QUARANTINE_WITH_TEST)
      .hasGroups()
  }

  public getQuarantineRestrictions(): Array<Quarantine | QuarantineWithTesting> {
    return [
      ...this.initialMatcher
        .withPresenceOf(RestrictionNodeType.QUARANTINE)
        .includeCriterionByType(RestrictionNodeType.QUARANTINE)
        .mergeWithMatcher(
          this.initialMatcher
            .withPresenceOf(RestrictionNodeType.QUARANTINE_WITH_TEST)
            .includeCriterionByType(RestrictionNodeType.QUARANTINE_WITH_TEST),
        ),
    ].flat(1)
  }

  public isTestRequired(): boolean {
    return !this.initialMatcher
      .withAbsenceOf(RestrictionNodeType.PCR_TEST)
      .withAbsenceOf(RestrictionNodeType.ANTIGEN_TEST)
      .withAbsenceOf(RestrictionNodeType.QUARANTINE_WITH_TEST)
      .hasGroups()
  }
}
