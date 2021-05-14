import { Destination } from '@/shared/src/api/destinations/models'
import { Restriction } from '@/shared/src/api/restrictions/models'
import { useAugmentedStore } from '@/shared/src/composables/use-plugins'
import { EntryWays } from '@/shared/src/restriction-tree/entry-ways'
import { Matcher } from '@/shared/src/restriction-tree/matcher'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import {
  VisitorContext,
  VisitorContextType,
} from '@/shared/src/restriction-tree/visitor-context'

export function createRestrictionFromDestination(
  destination: Destination,
  context?: VisitorContextType,
): Restriction {
  const optimalGroup = new EntryWays(
    new Matcher(destination.restrictions),
    new VisitorContext(context ?? useAugmentedStore().state.visitorContext),
  ).getOptimalGroup()

  const restriction = {
    origin:
      context?.origin ??
      useAugmentedStore().state.visitorContext[RestrictionNodeType.ORIGIN],
    destination: destination.countryCode,
    testRequired: false,
    insuranceRequired: false,
    selfIsolation: false,
    isForbidden: true,
    notes: '',
  }

  if (optimalGroup) {
    restriction.isForbidden = false
    restriction.testRequired = optimalGroup.some(
      (node) => node.id() === RestrictionNodeType.PCR_TEST,
    )
    restriction.selfIsolation = optimalGroup.some(
      (node) => node.id() === RestrictionNodeType.QUARANTINE,
    )
    restriction.insuranceRequired = optimalGroup.some(
      (node) => node.id() === RestrictionNodeType.INSURANCE,
    )
  }
  return new Restriction(restriction, destination)
}
