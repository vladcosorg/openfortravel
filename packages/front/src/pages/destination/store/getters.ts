import type { GetterTree } from 'vuex'

import {
  createCollection,
  createTripCard,
} from '@/front/src/composables/trip-cards'
import { TripCard } from '@/front/src/models/TripCard'
import type { StateClass } from '@/front/src/pages/destination/store/state'
import type { GetterSignatures } from '@/front/src/pages/destination/store/types/getters'
import type { RootStateType } from '@/front/src/store/state'
import { RestrictionGroupCollection } from '@/shared/src/restriction-tree/restriction-group'

export const getters: GetterTree<StateClass, RootStateType> & GetterSignatures =
  {
    origin: (state, _getters, _rootState, rootGetters) =>
      rootGetters.wrappedHostRules[state.currentOriginCode],

    destination: (state, _getters, _rootState, rootGetters) =>
      rootGetters.wrappedHostRules[state.currentDestinationCode],

    allGroups(_state, getters, rootState): RestrictionGroupCollection {
      return createCollection(getters.destination, rootState.visitorContext)
    },

    returnTripCard(_state, getters, rootState): TripCard {
      return createTripCard(
        getters.destination,
        getters.origin,
        rootState.visitorContext,
      )
    },
  }
