import {
  Destination,
  MappedDestinationCollection,
} from '@/shared/src/api/destinations/models'
import {
  MappedRestrictionCollection,
  Restriction,
} from '@/shared/src/api/restrictions/models'
import { useVuexRawGetter } from '@/shared/src/composables/use-vuex'

export function getHostAttributes(countryCode: string): Destination {
  return useVuexRawGetter<MappedDestinationCollection>('wrappedHostRules')[
    countryCode
  ]
}

export function getCurrentRestrictionFromOrigin(
  destinationCode: string,
): Restriction {
  return useVuexRawGetter<MappedRestrictionCollection>('currentRestrictions')[
    destinationCode
  ]
}
