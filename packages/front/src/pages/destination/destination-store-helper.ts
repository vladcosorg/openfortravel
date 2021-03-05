import { Restriction } from '@/shared/src/api/restrictions/models'
import { createScopedGetter } from '@/shared/src/composables/use-vuex'

export class DestinationStoreHelper {
  protected getter
  constructor() {
    this.getter = createScopedGetter('destinationPage')
  }

  public getRestriction(): Restriction {
    return this.getter<Restriction>('currentRestriction')
  }
}
