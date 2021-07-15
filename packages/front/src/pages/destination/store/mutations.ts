import type { MutationTree } from 'vuex'

import type { StateType } from '@/front/src/pages/destination/store/state'
import type { MutationSignatures } from '@/front/src/pages/destination/store/types/mutations'
import { MutationTypes } from '@/front/src/pages/destination/store/types/mutations'

export const mutations: MutationTree<StateType> & MutationSignatures = {
  [MutationTypes.toggleProfileEditor](state): void {
    state.isEditingProfile = !state.isEditingProfile
  },
  [MutationTypes.setCurrentDestinationIso](state, destinationIso): void {
    state.currentDestinationCode = destinationIso
  },
}
