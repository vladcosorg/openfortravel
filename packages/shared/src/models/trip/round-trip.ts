import { OneWayTrip } from '@/shared/src/models/trip/one-way-trip'

export class RoundTrip {
  constructor(
    public readonly outgoing: OneWayTrip,
    public readonly returning: OneWayTrip,
  ) {}

  get highlights(): string[] {
    const highlights: string[] = []

    if (this.outgoing.restrictions.isForbidden) {
      return highlights
    }

    if (this.outgoing.restrictions.quarantine) {
      highlights.push('quarantine')
    } else {
      highlights.push('no-quarantine')
    }

    if (this.outgoing.restrictions.pcrTest) {
      highlights.push('pcr-test')
    } else {
      highlights.push('no-pcr-test')
    }

    if (this.returning.restrictions.quarantine) {
      highlights.push('return-quarantine')
    } else {
      highlights.push('no-return-quarantine')
    }

    if (this.returning.restrictions.pcrTest) {
      highlights.push('return-pcr-test')
    } else {
      highlights.push('no-return-pcr-test')
    }

    return highlights
  }

  get rating(): number {
    return (this.outgoing.score + this.returning.score) / 2
  }
}

export type RoundTripCollection = RoundTrip[]
