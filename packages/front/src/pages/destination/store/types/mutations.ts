import type { StateType } from '@/front/src/pages/destination/store/state'
import { LiteDestinationDocument } from '@/shared/src/api/destinations/plain-destination'
import { IncompleteEncodedNodeCollection } from '@/shared/src/restriction-tree/converter'

export enum MutationTypes {
  setOriginCountryFactsheet = 'setOriginCountryFactsheet',
  setDestinationCountryFactsheet = 'setDestinationCountryFactsheet',
  setOutgoingRestrictions = 'setOutgoingRestrictions',
  setReturnRestrictions = 'setReturnRestrictions',
  resetRestrictions = 'resetRestrictions',
  resetDestinations = 'resetDestinations',
  toggleProfileEditor = 'toggleProfileEditor',
}

export type MutationSignatures<S = StateType> = {
  [MutationTypes.setOriginCountryFactsheet](
    state: S,
    factsheet: [string, LiteDestinationDocument] | undefined,
  ): void
  [MutationTypes.setDestinationCountryFactsheet](
    state: S,
    restrictions: [string, LiteDestinationDocument] | undefined,
  ): void
  [MutationTypes.setOutgoingRestrictions](
    state: S,
    restrictions: [string, IncompleteEncodedNodeCollection] | undefined,
  ): void
  [MutationTypes.setReturnRestrictions](
    state: S,
    restrictions: [string, IncompleteEncodedNodeCollection] | undefined,
  ): void
  [MutationTypes.resetRestrictions](state: S): void
  [MutationTypes.resetDestinations](state: S): void
}
