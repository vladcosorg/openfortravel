import type { StateType } from '@/front/src/pages/destination/store/state'

export enum MutationTypes {
  setCurrentDestinationIso = 'setCurrentDestinationIso',
  toggleProfileEditor = 'toggleProfileEditor',
}

export type MutationSignatures<S = StateType> = {
  [MutationTypes.toggleProfileEditor](state: S): void
  [MutationTypes.setCurrentDestinationIso](
    state: S,
    destinationIso: string,
  ): void
}
