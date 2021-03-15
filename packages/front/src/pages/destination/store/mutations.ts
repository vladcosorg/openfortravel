import { MutationTree } from 'vuex'

import { StateType } from '@/front/src/pages/destination/store/state'
import {
  MutationSignatures,
  MutationTypes,
} from '@/front/src/pages/destination/store/types/mutations'
import { PlainRestriction } from '@/shared/src/api/restrictions/models'

export const mutations: MutationTree<StateType> & MutationSignatures = {
  [MutationTypes.setCurrentCountryPair](state, countryPair): void {
    state.currentOriginCode = countryPair.originCode
    state.currentDestinationCode = countryPair.destinationCode
  },
  [MutationTypes.setReturnRestriction](state, restriction: PlainRestriction): void {
    state.returnRestriction = restriction
  },
  [MutationTypes.setRelatedRestrictions](state, result): void {
    state.relatedRestrictions = result
  },
}
