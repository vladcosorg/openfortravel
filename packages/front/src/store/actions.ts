import type { ActionTree } from 'vuex'

import type { RootStateType } from '@/front/src/store/state'
import type { ActionSignatures } from '@/front/src/store/types/actions'
import { RootActionTypes } from '@/front/src/store/types/actions'
import { MutationTypes } from '@/front/src/store/types/mutations'
import { findMappedOrigins } from '@/shared/src/api/destinations/repository'

export const actions: ActionTree<RootStateType, RootStateType> &
  ActionSignatures = {
  async [RootActionTypes.fetchHostRules]({ commit }) {
    commit(MutationTypes.setHostRules, await findMappedOrigins())
  },
}
