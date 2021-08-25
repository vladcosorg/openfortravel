import { getDestinationRouteURL } from '@/front/src/router/route-builders/destination'
import { CountryFactsheet } from '@/shared/src/models/country-factsheet/country-factsheet'
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
}
