import { createDestinationRoute } from '@/front/src/router/factory'
import { Destination } from '@/shared/src/api/destinations/models'
import { RestrictionStatus } from '@/shared/src/api/restrictions/models'
import { RestrictionGroup } from '@/shared/src/restriction-tree/restriction-group'

export class TripCard {
  constructor(
    protected readonly origin: Destination,
    protected readonly destination: Destination,
    protected readonly restrictionGroup: RestrictionGroup,
    protected readonly returnRestrictionGroup?: RestrictionGroup,
  ) {}

  get originISO(): string {
    return this.origin.countryCode
  }

  get destinationISO(): string {
    return this.destination.countryCode
  }

  get score(): number {
    if (this.isForbidden) {
      return 0
    }

    return this.restrictionGroup.rating
  }

  get status(): RestrictionStatus {
    return this.restrictionGroup.status
  }

  get isForbidden(): boolean {
    return this.restrictionGroup.status === RestrictionStatus.FORBIDDEN
  }

  get returnIsForbidden(): boolean {
    return this.restrictionGroup.status === RestrictionStatus.FORBIDDEN
  }

  get quarantineRequired(): boolean {
    return this.restrictionGroup.quarantineRequired
  }

  get returnQuarantineRequired(): boolean {
    return this.restrictionGroup.quarantineRequired
  }

  get highlights(): string[] {
    const highlights: string[] = []

    if (this.isForbidden) {
      return highlights
    }

    if (this.restrictionGroup.quarantineRequired) {
      highlights.push('quarantine')
    } else {
      highlights.push('no-quarantine')
    }

    if (this.restrictionGroup.pcrTestRequired) {
      highlights.push('pcr-test')
    } else {
      highlights.push('no-pcr-test')
    }

    if (this.restrictionGroup.insuranceRequired) {
      highlights.push('insurance')
    }

    if (this.returnRestrictionGroup) {
      if (this.returnRestrictionGroup.quarantineRequired) {
        highlights.push('return-quarantine')
      } else {
        highlights.push('no-return-quarantine')
      }

      if (this.returnRestrictionGroup.pcrTestRequired) {
        highlights.push('return-pcr-test')
      }
    }

    return highlights
  }

  getDetailsURL(searchId?: string): string {
    return createDestinationRoute({
      originCode: this.origin.countryCode,
      destinationCode: this.destination.countryCode,
      searchId,
    })
  }

  includesSubtring(substring: string): boolean {
    return this.destination.originLabel.toLowerCase().includes(substring)
  }

  substringIndex(substring: string): number {
    return this.destination.originLabel.indexOf(substring)
  }
}
