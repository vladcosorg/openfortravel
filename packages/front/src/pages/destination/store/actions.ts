import { ActionTree } from 'vuex'

import { StateClass } from '@/front/src/pages/destination/store/state'
import {
  ActionSignatures,
  ActionTypes,
  CurrentCountryPair,
} from '@/front/src/pages/destination/store/types/actions'
import { MutationTypes } from '@/front/src/pages/destination/store/types/mutations'
import { StateInterface } from '@/front/src/store/state'
import { RootActionTypes } from '@/front/src/store/types/actions'
import {
  findRestrictionByOriginAndDestination,
  findRestrictionsByDestination,
} from '@/shared/src/api/restrictions/repository'

export const actions: ActionTree<StateClass, StateInterface> & ActionSignatures = {
  async [ActionTypes.fetchReturnRestriction](
    { commit, state },
    { originCode, destinationCode },
  ) {
    if (
      state.returnRestriction &&
      state.returnRestriction.origin === originCode &&
      state.returnRestriction.destination === destinationCode
    ) {
      return
    }
    commit(
      MutationTypes.setReturnRestriction,
      await findRestrictionByOriginAndDestination(originCode, destinationCode),
    )
  },

  async [ActionTypes.fetchRelatedRestrictions]({ commit, state }, destinationCode: string) {
    if (state.relatedRestrictions.destinationCode === destinationCode) {
      return
    }
    commit(MutationTypes.setRelatedRestrictions, {
      destinationCode,
      restrictions: await findRestrictionsByDestination(destinationCode),
    })
  },

  async [ActionTypes.fetch]({ commit, dispatch }, countryPair: CurrentCountryPair) {
    commit(MutationTypes.setCurrentCountryPair, countryPair)
    await dispatch(RootActionTypes.fetchSharedRestrictions, countryPair.originCode, {
      root: true,
    })
    await dispatch(ActionTypes.fetchRelatedRestrictions, countryPair.destinationCode)
    await dispatch(ActionTypes.fetchReturnRestriction, {
      originCode: countryPair.destinationCode,
      destinationCode: countryPair.originCode,
    })
  },
}
