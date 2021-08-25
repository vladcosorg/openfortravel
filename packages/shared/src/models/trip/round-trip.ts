import { OneWayTrip } from '@/shared/src/models/trip/one-way-trip'

export class RoundTrip {
  constructor(
    public readonly outgoing: OneWayTrip,
    public readonly returning: OneWayTrip,
  ) {}

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
}

export type RoundTripCollection = RoundTrip[]
