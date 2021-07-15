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
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export const getters: GetterTree<StateClass, RootStateType> & GetterSignatures =
  {
    origin: (_state, getters, _rootState, rootGetters) =>
      rootGetters.wrappedHostRules[getters.currentOriginCode],

    currentOriginCode: (_state, _getters, rootState) =>
      rootState.visitorContext[RestrictionNodeType.ORIGIN],

    destination: (state, _getters, _rootState, rootGetters) =>
      rootGetters.wrappedHostRules[state.currentDestinationCode],

    allGroups(
      _state,
      getters,
      _rootState,
      rootGetters,
    ): RestrictionGroupCollection {
      return createCollection(
        getters.destination,
        rootGetters.visitorContextWithDefaults,
      )
    },

    returnTripCard(_state, getters, _rootState, rootGetters): TripCard {
      return createTripCard(
        getters.destination,
        getters.origin,
        rootGetters.visitorContextWithDefaults,
      )
    },
  }
