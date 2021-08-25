import { createRoundTripCard } from '@/front/src/composables/createRoundTripCard'
import { QuarantineQuestion } from '@/front/src/pages/destination/questions/items/quarantine-question'
import { Question } from '@/front/src/pages/destination/questions/question'
import type { StateClass } from '@/front/src/pages/destination/store/state'
import type { GetterSignatures } from '@/front/src/pages/destination/store/types/getters'
import type { RootStateType } from '@/front/src/store/state'
import { CountryFactsheet } from '@/shared/src/models/country-factsheet/country-factsheet'
import { createRawFactsheet } from '@/shared/src/models/country-factsheet/raw-factory'
import { convertIncompleteTreeFromStorageFormat } from '@/shared/src/restriction-tree/converter'
import {
  createRestrictionGroupCollection,
  RestrictionGroupCollection,
} from '@/shared/src/restriction-tree/restriction-group'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

import type { GetterTree } from 'vuex'

export const getters: GetterTree<StateClass, RootStateType> & GetterSignatures =
  {
    originFactsheet: (state, getters) =>
      new CountryFactsheet(
        createRawFactsheet(
          getters.currentOriginCode,
          state.originCountryFactsheet?.[1],
        ),
      ),
    destinationFactsheet: (state, getters) =>
      new CountryFactsheet(
        createRawFactsheet(
          getters.currentDestinationCode,
          state.destinationCountryFactsheet?.[1],
        ),
      ),

    origin: (_state, getters, _rootState, rootGetters) =>
      rootGetters.wrappedHostRules[getters.currentOriginCode],

    currentOriginCode: (_state, _getters, rootState) =>
      rootState.visitorContext[RestrictionNodeType.ORIGIN],

    currentDestinationCode: (_state, _getters, rootState) =>
      rootState.slugs['destinationSlug'],

    destination: (_state, getters, _rootState, rootGetters) =>
      rootGetters.wrappedHostRules[getters.currentDestinationCode],

    tripCard(_state, getters, _rootState, rootGetters) {
      return createRoundTripCard(
        getters.origin,
        getters.destination,
        rootGetters.visitorContextWithDefaults,
      )
    },
    outgoingRestrictions(
      state,
      _getters,
      _rootState,
      rootGetters,
    ): RestrictionGroupCollection {
      return createRestrictionGroupCollection(
        convertIncompleteTreeFromStorageFormat(
          state.outgoingRestrictions ? state.outgoingRestrictions[1] : [],
        ),
        rootGetters.visitorContextWithDefaults,
      )
    },
    returnRestrictions(
      state,
      getters,
      _rootState,
      rootGetters,
    ): RestrictionGroupCollection {
      return createRestrictionGroupCollection(
        convertIncompleteTreeFromStorageFormat(
          state.returnRestrictions ? state.returnRestrictions[1] : [],
        ),
        Object.assign({}, rootGetters.visitorContextWithDefaults, {
          [RestrictionNodeType.ORIGIN]: getters.currentDestinationCode,
        }),
      )
    },
    questions(state, getters): Question[] {
      if (
        !getters.originFactsheet ||
        !getters.destinationFactsheet ||
        !getters.outgoingRestrictions ||
        !getters.returnRestrictions
      ) {
        return []
      }
      return [
        // new GeneralQuestion(getters.tripCard.outgoingTrip),
        // new GeneralQuestion(getters.tripCard.returnTrip, true),
        new QuarantineQuestion(
          getters.originFactsheet,
          getters.destinationFactsheet,
          getters.outgoingRestrictions,
        ),
        new QuarantineQuestion(
          getters.destinationFactsheet,
          getters.originFactsheet,
          getters.returnRestrictions,
          true,
        ),
      ]
    },
    restrictionsLoading(store): boolean {
      return (
        store.returnRestrictions === undefined ||
        store.outgoingRestrictions === undefined
      )
    },
  }
