import {
  Destination,
  MappedDestinationCollection,
} from '@/shared/src/api/destinations/models'
import { useVuexRawGetter } from '@/shared/src/composables/use-vuex'

export function getHostAttributes(countryCode: string): Destination {
  return useVuexRawGetter<MappedDestinationCollection>('wrappedHostRules')[
    countryCode
  ]
}
