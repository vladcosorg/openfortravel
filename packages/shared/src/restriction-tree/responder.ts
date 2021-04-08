import { Matcher } from '@/shared/src/restriction-tree/matcher'
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

  public isTestRequired(): boolean {
    return !this.initialMatcher
      .withAbsenceOf(RestrictionNodeType.PCR_TEST)
      .withAbsenceOf(RestrictionNodeType.ANTIGEN_TEST)
      .withAbsenceOf(RestrictionNodeType.QUARANTINE_WITH_TEST)
      .hasGroups()
  }
}
