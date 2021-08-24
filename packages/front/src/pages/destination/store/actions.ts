import { serverCache } from '@/front/src/misc/server-cache'
import type { StateClass } from '@/front/src/pages/destination/store/state'
import type { ActionSignatures } from '@/front/src/pages/destination/store/types/actions'
import { ActionTypes } from '@/front/src/pages/destination/store/types/actions'
import { MutationTypes } from '@/front/src/pages/destination/store/types/mutations'
import type { StateInterface } from '@/front/src/store/state'
import {
  fetchCountryDetails,
  fetchDetailedRestrictions,
} from '@/shared/src/api/function-api'

import type { ActionTree } from 'vuex'

export const actions: ActionTree<StateClass, StateInterface> &
  ActionSignatures = {
  async [ActionTypes.fetchAll]({ dispatch }) {
    await dispatch(ActionTypes.fetchCountryFactsheets)
    await dispatch(ActionTypes.fetchRestrictions)
  },
  async [ActionTypes.fetchCountryFactsheets]({ commit, getters, state }) {
    if (
      state.originCountryFactsheet &&
      state.originCountryFactsheet[0] === getters.currentOriginCode &&
      state.destinationCountryFactsheet &&
      state.destinationCountryFactsheet[0] === getters.currentDestinationCode
    ) {
      return
    }

    // eslint-disable-next-line unicorn/no-useless-undefined
    commit(MutationTypes.resetDestinations, undefined)

    if (serverCache.destinations) {
      commit(MutationTypes.setOriginCountryFactsheet, [
        getters.currentOriginCode,
        serverCache.destinations[getters.currentOriginCode],
      ])
      commit(MutationTypes.setDestinationCountryFactsheet, [
        getters.currentDestinationCode,
        serverCache.destinations[getters.currentDestinationCode],
      ])
    } else {
      commit(MutationTypes.setOriginCountryFactsheet, [
        getters.currentDestinationCode,
        await fetchCountryDetails(getters.currentOriginCode),
      ])
      commit(MutationTypes.setDestinationCountryFactsheet, [
        getters.currentDestinationCode,
        await fetchCountryDetails(getters.currentDestinationCode),
      ])
    }
  },
  async [ActionTypes.fetchRestrictions]({ commit, getters, state }) {
    if (
      state.outgoingRestrictions &&
      state.outgoingRestrictions[0] === getters.currentOriginCode &&
      state.returnRestrictions &&
      state.returnRestrictions[0] === getters.currentDestinationCode
    ) {
      return
    }

    // eslint-disable-next-line unicorn/no-useless-undefined
    commit(MutationTypes.resetRestrictions, undefined)

    if (serverCache.destinations) {
      commit(MutationTypes.setOutgoingRestrictions, [
        getters.currentOriginCode,
        serverCache.destinations[getters.currentDestinationCode]
          ?.restrictionTree,
      ])
      commit(MutationTypes.setReturnRestrictions, [
        getters.currentDestinationCode,
        serverCache.destinations[getters.currentOriginCode]?.restrictionTree,
      ])
    } else {
      commit(MutationTypes.setOutgoingRestrictions, [
        getters.currentDestinationCode,
        await fetchDetailedRestrictions(getters.currentDestinationCode),
      ])
      commit(MutationTypes.setReturnRestrictions, [
        getters.currentDestinationCode,
        await fetchDetailedRestrictions(getters.currentOriginCode),
      ])
    }
  },
}
