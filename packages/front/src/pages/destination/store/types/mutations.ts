import type { StateType } from '@/front/src/pages/destination/store/state'
import { FactsheetCountryDocument } from '@/shared/src/models/country-factsheet/raw-country-factsheet'
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
    factsheet: [string, FactsheetCountryDocument] | undefined,
  ): void
  [MutationTypes.setDestinationCountryFactsheet](
    state: S,
    restrictions: [string, FactsheetCountryDocument] | undefined,
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
