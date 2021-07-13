import type { StateType } from '@/front/src/pages/destination/store/state'
import type {
  CurrentCountryPair,
  Links,
} from '@/front/src/pages/destination/store/types/actions'
import type {
  PlainRestriction,
  PlainRestrictionCollection,
} from '@/shared/src/api/restrictions/models'

export enum MutationTypes {
  setCurrentCountryPair = 'setCurrentCountryPair',
  setReturnRestriction = 'setReturnRestriction',
  setRelatedRestrictions = 'setRelatedRestrictions',
  toggleProfileEditor = 'toggleProfileEditor',
  setRelatedURLs = 'setRelatedURLs',
}

export type MutationSignatures<S = StateType> = {
  [MutationTypes.toggleProfileEditor](state: S): void
  [MutationTypes.setCurrentCountryPair](
    state: S,
    payload: CurrentCountryPair,
  ): void
  [MutationTypes.setReturnRestriction](
    state: S,
    restriction: PlainRestriction,
  ): void
  [MutationTypes.setRelatedRestrictions](
    state: S,
    result: {
      destinationCode: string
      restrictions: PlainRestrictionCollection
    },
  ): void
  [MutationTypes.setRelatedURLs](state: S, links: Links): void
}
