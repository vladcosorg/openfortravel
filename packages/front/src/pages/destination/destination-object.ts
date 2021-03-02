import { Destination } from '@/shared/src/api/destinations/models'
import { Restriction } from '@/shared/src/api/restrictions/models'
import { useVuexRawGetter } from '@/shared/src/composables/use-vuex'

export class DestinationObject {
  constructor(
    protected readonly restriction: Restriction,
    protected readonly destination: Destination,
  ) {}

  public relatedRestrictionList() {
    const restrictions = useVuexRawGetter<Restriction[]>(
      'destinationPage/relatedRestrictionList',
    )
    return restrictions
      .filter((restriction) => !restriction.isAllowed())
      .map((restriction) => restriction.originLabel)
  }

  public getReturnRestriction(): Restriction {
    return useVuexRawGetter<Restriction>('destinationPage/returnRestriction')
  }
}
