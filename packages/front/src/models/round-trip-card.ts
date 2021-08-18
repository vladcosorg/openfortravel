import { OneWayTripCard } from '@/front/src/models/one-way-trip-card'
import { getDestinationRouteURL } from '@/front/src/router/route-builders/destination'
import { Destination } from '@/shared/src/api/destinations/models'
import { RestrictionStatus } from '@/shared/src/api/restrictions/models'

export class RoundTripCard {
  public readonly origin: Destination
  public readonly destination: Destination
  constructor(
    public readonly outgoingTrip: OneWayTripCard,
    public readonly returnTrip: OneWayTripCard,
  ) {
    this.origin = outgoingTrip.origin
    this.destination = outgoingTrip.destination
  }

  get originISO(): string {
    return this.origin.countryCode
  }

  get destinationISO(): string {
    return this.destination.countryCode
  }

  get score(): number {
    return this.outgoingTrip.score
  }

  get status(): RestrictionStatus {
    return this.outgoingTrip.status
  }

  get isForbidden(): boolean {
    return this.outgoingTrip.isForbidden
  }

  get returnIsForbidden(): boolean {
    return this.returnTrip.isForbidden
  }

  get quarantineRequired(): boolean {
    return this.outgoingTrip.quarantineRequired
  }

  get returnQuarantineRequired(): boolean {
    return this.returnTrip.quarantineRequired
  }

  get highlights(): string[] {
    return []
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
