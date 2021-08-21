import { getDestinationRouteURL } from '@/front/src/router/route-builders/destination'
import { Destination } from '@/shared/src/api/destinations/models'
import { RestrictionStatus } from '@/shared/src/api/restrictions/models'
import { createCollection } from '@/shared/src/composables/createCollection'
import {
  RestrictionGroup,
  RestrictionGroupCollection,
} from '@/shared/src/restriction-tree/restriction-group'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

export class OneWayTripCard {
  protected restrictions: RestrictionGroupCollection
  public bestGroup: RestrictionGroup
  constructor(
    public readonly origin: Destination,
    public readonly destination: Destination,
    public profile: VisitorProfile,
  ) {
    this.restrictions = createCollection(destination, profile)
    this.bestGroup = this.restrictions.getBestGroup() ?? new RestrictionGroup()
  }

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

    return this.bestGroup.rating
  }

  get status(): RestrictionStatus {
    return this.bestGroup.status
  }

  get isForbidden(): boolean {
    return this.bestGroup.status === RestrictionStatus.FORBIDDEN
  }

  get returnIsForbidden(): boolean {
    return this.bestGroup.status === RestrictionStatus.FORBIDDEN
  }

  get quarantineRequired(): boolean {
    return this.bestGroup.quarantineRequired
  }

  get returnQuarantineRequired(): boolean {
    return this.bestGroup.quarantineRequired
  }

  get highlights(): string[] {
    const highlights: string[] = []

    if (this.isForbidden) {
      return highlights
    }

    if (this.bestGroup.quarantineRequired) {
      highlights.push('quarantine')
    } else {
      highlights.push('no-quarantine')
    }

    if (this.bestGroup.pcrTestRequired) {
      highlights.push('pcr-test')
    } else {
      highlights.push('no-pcr-test')
    }

    if (this.bestGroup.insuranceRequired) {
      highlights.push('insurance')
    }
    return highlights
  }

  get url(): string {
    return getDestinationRouteURL({
      originSlug: this.origin.countryCode,
      destinationSlug: this.destination.countryCode,
    })
  }

  includesSubtring(substring: string): boolean {
    return this.destination.originLabel.toLowerCase().includes(substring)
  }

  substringIndex(substring: string): number {
    return this.destination.originLabel.indexOf(substring)
  }
}
