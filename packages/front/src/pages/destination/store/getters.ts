import { QuarantineQuestion } from '@/front/src/pages/destination/questions/items/quarantine-question'
import { Question } from '@/front/src/pages/destination/questions/question'
import type { StateClass } from '@/front/src/pages/destination/store/state'
import type { GetterSignatures } from '@/front/src/pages/destination/store/types/getters'
import type { RootStateType } from '@/front/src/store/state'
import { createCollection } from '@/shared/src/composables/createCollection'
import { RestrictionGroupCollection } from '@/shared/src/restriction-tree/restriction-group'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

import type { GetterTree } from 'vuex'
import { createRoundTripCard } from '@/front/src/composables/createRoundTripCard'

export const getters: GetterTree<StateClass, RootStateType> & GetterSignatures =
  {
    origin: (_state, getters, _rootState, rootGetters) =>
      rootGetters.wrappedHostRules[getters.currentOriginCode],

    currentOriginCode: (_state, _getters, rootState) =>
      rootState.visitorContext[RestrictionNodeType.ORIGIN],

    currentDestinationCode: (_state, _getters, rootState) =>
      rootState.slugs['destinationSlug'],

    destination: (_state, getters, _rootState, rootGetters) =>
      rootGetters.wrappedHostRules[getters.currentDestinationCode],

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
    tripCard(_state, getters, _rootState, rootGetters) {
      return createRoundTripCard(
        getters.origin,
        getters.destination,
        rootGetters.visitorContextWithDefaults,
      )
    },
    questions(state, getters): Question[] {
      return [
        // new GeneralQuestion(getters.tripCard.outgoingTrip),
        // new GeneralQuestion(getters.tripCard.returnTrip, true),
        new QuarantineQuestion(getters.tripCard.outgoingTrip),
        new QuarantineQuestion(getters.tripCard.returnTrip, true),
      ]
    },
  }
