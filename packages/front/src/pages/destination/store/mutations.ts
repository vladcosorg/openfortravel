import { MutationTree } from 'vuex'

import { CurrentCountryPair } from '@/front/src/pages/destination/store/action-types'
import { StateType } from '@/front/src/pages/destination/store/state'
import {
  PlainRestriction,
  PlainRestrictionCollection,
} from '@/shared/src/api/restrictions/models'

export enum MutationTypes {
  setCurrentCountryPair = 'setCurrentCountryPair',
  setReturnRestriction = 'setReturnRestriction',
  setRelatedRestrictions = 'setRelatedRestrictions',
}

export type Mutations<S = StateType> = {
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
}

export const mutations: MutationTree<StateType> & Mutations = {
  [MutationTypes.setCurrentCountryPair](state, countryPair): void {
    state.currentOriginCode = countryPair.originCode
    state.currentDestinationCode = countryPair.destinationCode
  },
  [MutationTypes.setReturnRestriction](
    state,
    restriction: PlainRestriction,
  ): void {
    state.returnRestriction = restriction
  },
  [MutationTypes.setRelatedRestrictions](state, result): void {
    state.relatedRestrictions = result
  },
}
