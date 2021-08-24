import type { StateType } from '@/front/src/pages/destination/store/state'
import type { MutationSignatures } from '@/front/src/pages/destination/store/types/mutations'
import { MutationTypes } from '@/front/src/pages/destination/store/types/mutations'

import type { MutationTree } from 'vuex'

export const mutations: MutationTree<StateType> & MutationSignatures = {
  [MutationTypes.toggleProfileEditor](state): void {
    state.isEditingProfile = !state.isEditingProfile
  },
  [MutationTypes.setOriginCountryFactsheet](state, factsheet): void {
    state.originCountryFactsheet = factsheet
  },
  [MutationTypes.setDestinationCountryFactsheet](state, factsheet): void {
    state.destinationCountryFactsheet = factsheet
  },
  [MutationTypes.setOutgoingRestrictions](state, restrictions): void {
    state.outgoingRestrictions = restrictions
  },
  [MutationTypes.setReturnRestrictions](state, restrictions): void {
    state.returnRestrictions = restrictions
  },
  [MutationTypes.resetRestrictions](state): void {
    state.returnRestrictions = undefined
    state.outgoingRestrictions = undefined
  },
  [MutationTypes.resetDestinations](state): void {
    state.originCountryFactsheet = undefined
    state.destinationCountryFactsheet = undefined
  },
}
