import type { ActionTree } from 'vuex'

import { saveContextToCookie } from '@/front/src/modules/visitor-context/cookies'
import type { RootStateType } from '@/front/src/store/state'
import type { ActionSignatures } from '@/front/src/store/types/actions'
import { RootActionTypes } from '@/front/src/store/types/actions'
import { MutationTypes } from '@/front/src/store/types/mutations'
import { getOrCreateSearchId } from '@/shared/src/api/searchIds/repository'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

export const actions: ActionTree<RootStateType, RootStateType> &
  ActionSignatures = {
  async [RootActionTypes.assignSearchId]({ commit }, { visitorProfile }) {
    const filtered = Object.entries(visitorProfile).filter(([name, value]) => {
      if (value === undefined) {
        return false
      }

      if (name === RestrictionNodeType.ORIGIN) {
        return false
      }

      if (
        name === RestrictionNodeType.DID_NOT_VISIT_COUNTRIES &&
        Array.isArray(value) &&
        value.length === 0
      ) {
        return false
      }

      return true
    })

    if (filtered.length > 0) {
      const id = await getOrCreateSearchId(
        Object.fromEntries(filtered) as Partial<VisitorProfile>,
      )
      commit(MutationTypes.setSearchId, id)
    } else {
      //eslint-disable-next-line unicorn/no-null
      commit(MutationTypes.setSearchId, null)
    }
  },

  async [RootActionTypes.updateVisitorProfileField](
    { commit, state, dispatch },
    data,
  ) {
    commit(MutationTypes.setVisitorContextField, data)
    await dispatch(RootActionTypes.assignSearchId, {
      visitorProfile: state.visitorContext,
    })
    saveContextToCookie(state.visitorContext, state.searchId)
  },
}
