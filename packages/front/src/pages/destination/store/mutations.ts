import type { MutationTree } from 'vuex'

import type { StateType } from '@/front/src/pages/destination/store/state'
import type {
  MutationSignatures} from '@/front/src/pages/destination/store/types/mutations';
import {
  MutationTypes,
} from '@/front/src/pages/destination/store/types/mutations'
import type { PlainRestriction } from '@/shared/src/api/restrictions/models'

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
