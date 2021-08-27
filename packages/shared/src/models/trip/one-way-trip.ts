import { getDestinationRouteURL } from '@/front/src/router/route-builders/destination'
import { CountryFactsheet } from '@/shared/src/models/country-factsheet/country-factsheet'
import { riskLevel } from '@/shared/src/models/country-factsheet/raw-country-factsheet'
import { PrecomputedRestriction } from '@/shared/src/models/precomputed-restriction/precomputed-restriction'

export class OneWayTrip {
  constructor(
    public readonly origin: CountryFactsheet,
    public readonly destination: CountryFactsheet,
    public readonly restrictions: PrecomputedRestriction,
  ) {}

  get url(): string {
    return getDestinationRouteURL({
      originSlug: this.origin.countryCode,
      destinationSlug: this.destination.countryCode,
    })
  }

  get score() {
    const penaltySum =
      this.restrictions.rating + riskLevel.indexOf(this.destination.riskLevel)

    if (this.restrictions.isForbidden) {
      return 0
    }

    if (penaltySum <= 1) {
      return 10
    }

    if (penaltySum <= 2) {
      return 9
    }

    if (penaltySum <= 3) {
      return 8
    }
    if (penaltySum <= 4) {
      return 7
    }

    if (penaltySum <= 5) {
      return 6
    }

    if (penaltySum <= 6) {
      return 5
    }

    if (penaltySum <= 7) {
      return 4
    }

    if (penaltySum <= 6) {
      return 4
    }

    if (penaltySum <= 8) {
      return 3
    }

    if (penaltySum <= 9) {
      return 2
    }

    return 1
  }
}
