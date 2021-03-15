import { StateType } from '@/front/src/pages/destination/store/state'
import { CurrentCountryPair } from '@/front/src/pages/destination/store/types/actions'
import {
  PlainRestriction,
  PlainRestrictionCollection,
} from '@/shared/src/api/restrictions/models'

export enum MutationTypes {
  setCurrentCountryPair = 'setCurrentCountryPair',
  setReturnRestriction = 'setReturnRestriction',
  setRelatedRestrictions = 'setRelatedRestrictions',
}

export type MutationSignatures<S = StateType> = {
  [MutationTypes.setCurrentCountryPair](state: S, payload: CurrentCountryPair): void
  [MutationTypes.setReturnRestriction](state: S, restriction: PlainRestriction): void
  [MutationTypes.setRelatedRestrictions](
    state: S,
    result: {
      destinationCode: string
      restrictions: PlainRestrictionCollection
    },
  ): void
}
