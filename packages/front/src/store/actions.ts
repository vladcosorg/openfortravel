import type { ActionTree } from 'vuex'

import { saveContextToCookie } from '@/front/src/modules/visitor-context/cookies'
import type { RootStateType } from '@/front/src/store/state'
import type { ActionSignatures } from '@/front/src/store/types/actions'
import { RootActionTypes } from '@/front/src/store/types/actions'
import { MutationTypes } from '@/front/src/store/types/mutations'

export const actions: ActionTree<RootStateType, RootStateType> &
  ActionSignatures = {
  async [RootActionTypes.updateVisitorProfileField](
    { commit, state, dispatch },
    data,
  ) {
    commit(MutationTypes.setVisitorContextField, data)
    saveContextToCookie(state.visitorContext)
  },
}
