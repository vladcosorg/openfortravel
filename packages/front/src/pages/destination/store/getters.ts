import type { GetterTree } from 'vuex'

import { RoundTrip } from '@/front/src/models/RoundTrip'
import type { StateClass } from '@/front/src/pages/destination/store/state'
import type { GetterSignatures } from '@/front/src/pages/destination/store/types/getters'
import type { RootStateType } from '@/front/src/store/state'
import { RestrictionGroupCollection } from '@/shared/src/restriction-tree/restriction-group'

export const getters: GetterTree<StateClass, RootStateType> &
  GetterSignatures = {
  currentDestination: (state, _getters, _rootState, rootGetters) =>
    rootGetters.wrappedHostRules[state.currentDestinationCode],

  currentReturnDestination: (state, _getters, _rootState, rootGetters) =>
    rootGetters.wrappedHostRules[state.currentOriginCode],

  allGroups(_state, getters, rootState): RestrictionGroupCollection {
    return new RestrictionGroupCollection(
      getters.currentDestination.restrictions,
      rootState.visitorContext,
    )
  },

  availableGroups(_state, getters) {
    return getters.allGroups.availableGroups()
  },

  unavailableGroups(_state, getters) {
    return getters.allGroups.getUnavailableGroups()
  },

  roundTrip(_state, getters, rootState): RoundTrip {
    const collection = new RestrictionGroupCollection(
      getters.currentDestination.restrictions,
      rootState.visitorContext,
    )

    return new RoundTrip(
      getters.currentDestination,
      getters.currentReturnDestination,
      collection.getBestGroup(),
    )
  },
}
