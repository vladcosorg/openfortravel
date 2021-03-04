import { Module } from 'vuex'

import { GeneralQuestion } from '@/front/src/pages/destination/questions/items/general-question'
import { Question } from '@/front/src/pages/destination/questions/question'
import { ReturnQuestion } from '@/front/src/pages/destination/questions/items/return-question'
import { VisitedCountryQuestion } from '@/front/src/pages/destination/questions/items/visited-country-question'
import { StateInterface } from '@/front/src/store'
import {
  Destination,
  MappedDestinationCollection,
} from '@/shared/src/api/destinations/models'
import {
  getFullRestrictionsListForDestination,
  wrapWithRichRestrictionObject,
} from '@/shared/src/api/restrictions/helper'
import {
  MappedRestrictionCollection,
  PlainRestriction,
  PlainRestrictionCollection,
  Restriction,
  RestrictionCollection,
} from '@/shared/src/api/restrictions/models'
import {
  findRestrictionByOriginAndDestination,
  findRestrictionsByDestination,
} from '@/shared/src/api/restrictions/repository'

export type CurrentCountryPair = {
  currentOriginCode: string
  currentDestinationCode: string
}

class State {
  public currentOriginCode?: string = undefined
  public currentDestinationCode?: string = undefined
  public returnRestriction?: PlainRestriction = undefined
  public relatedRestrictions: {
    destinationCode?: string
    restrictions: PlainRestrictionCollection
  } = { restrictions: [] }
}

export default {
  namespaced: true,
  state: function () {
    return new State()
  },

  getters: {
    relatedRestrictionList: (state): RestrictionCollection => {
      if (!state.relatedRestrictions.destinationCode) {
        return []
      }

      return getFullRestrictionsListForDestination(
        state.relatedRestrictions.restrictions,
        state.relatedRestrictions.destinationCode,
      )
    },

    relatedRestrictionForbiddenStringList: (_state, getters): string[] => {
      const list: RestrictionCollection = getters['relatedRestrictionList']
      return list
        .filter((restriction) => !restriction.isAllowed())
        .map((restriction) => restriction.originLabel)
    },
    currentRestriction: (
      state,
      _getters,
      _rootState,
      rootGetters,
    ): Restriction | undefined => {
      if (!state.currentDestinationCode) {
        return
      }

      const restrictions: MappedRestrictionCollection =
        rootGetters['sharedRestrictions']

      return restrictions[state.currentDestinationCode]
    },
    returnRestriction: (state): Restriction | undefined => {
      if (!state.returnRestriction) {
        return
      }
      return wrapWithRichRestrictionObject(state.returnRestriction)
    },
    currentDestination: (
      state,
      _getters,
      _rootState,
      rootGetters,
    ): Destination | undefined => {
      if (!state.currentDestinationCode) {
        return
      }

      const destinations: MappedDestinationCollection =
        rootGetters['wrappedHostRules']

      return destinations[state.currentDestinationCode]
    },

    currentReturnDestination: (
      state,
      _getters,
      _rootState,
      rootGetters,
    ): Destination | undefined => {
      if (!state.currentOriginCode) {
        return
      }

      const destinations: MappedDestinationCollection =
        rootGetters['wrappedHostRules']

      return destinations[state.currentOriginCode]
    },
    questions: (_state, getters): Question[] => {
      const restriction: Restriction | undefined = getters['currentRestriction']
      const destination: Destination | undefined = getters['currentDestination']

      if (!restriction || !destination) {
        return []
      }

      return [GeneralQuestion, VisitedCountryQuestion, ReturnQuestion]
        .map((item) => new item(restriction, destination))
        .filter((question) => !question.skip)
    },
  },
  mutations: {
    setCurrentCountryPair(
      state: State,
      countryPair: {
        currentOriginCode: string
        currentDestinationCode: string
      },
    ): void {
      state.currentOriginCode = countryPair.currentOriginCode
      state.currentDestinationCode = countryPair.currentDestinationCode
    },
    setReturnRestriction(state: State, restriction: PlainRestriction): void {
      state.returnRestriction = restriction
    },
    setRelatedRestrictions(
      state: State,
      result: {
        destinationCode: string
        restrictions: PlainRestrictionCollection
      },
    ): void {
      state.relatedRestrictions = result
    },
  },
  actions: {
    async fetchReturnRestriction(
      { commit, state },
      {
        originCode,
        destinationCode,
      }: { originCode: string; destinationCode: string },
    ) {
      if (
        state.returnRestriction &&
        state.returnRestriction.origin === originCode &&
        state.returnRestriction.destination === destinationCode
      ) {
        return
      }
      commit(
        'setReturnRestriction',
        await findRestrictionByOriginAndDestination(
          originCode,
          destinationCode,
        ),
      )
    },

    async fetchRelatedRestrictions({ commit, state }, destinationCode: string) {
      if (state.relatedRestrictions.destinationCode === destinationCode) {
        return
      }
      commit('setRelatedRestrictions', {
        destinationCode,
        restrictions: await findRestrictionsByDestination(destinationCode),
      })
    },

    async fetch({ commit, dispatch }, countryPair: CurrentCountryPair) {
      commit('setCurrentCountryPair', countryPair)
      await dispatch('fetchSharedRestrictions', countryPair.currentOriginCode, {
        root: true,
      })
      await dispatch(
        'fetchRelatedRestrictions',
        countryPair.currentDestinationCode,
      )
      await dispatch('fetchReturnRestriction', {
        originCode: countryPair.currentDestinationCode,
        destinationCode: countryPair.currentOriginCode,
      })
    },
  },
} as Module<State, StateInterface>
