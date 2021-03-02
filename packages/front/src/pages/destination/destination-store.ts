import { Module } from 'vuex'

import { StateInterface } from '@/front/src/store'
import {
  createDummyPlainDestination,
  wrapWithRichDestinationObject,
} from '@/shared/src/api/destinations/helper'
import {
  Destination,
  MappedDestinationCollection,
  PlainDestination,
} from '@/shared/src/api/destinations/models'
import {
  createDummyPlainRestriction,
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
  public currentOriginCode?: string = ''
  public currentDestinationCode?: string = ''
  public restriction = createDummyPlainRestriction()
  public returnRestriction = createDummyPlainRestriction()
  public destination = createDummyPlainDestination()
  public returnDestination = createDummyPlainDestination()
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
    getRestriction: (state): Restriction =>
      wrapWithRichRestrictionObject(state.restriction),
    getReturnRestriction: (state): Restriction =>
      wrapWithRichRestrictionObject(state.returnRestriction),
    getDestination: (state): Destination =>
      wrapWithRichDestinationObject(state.destination),
    getReturnDestination: (state): Destination =>
      wrapWithRichDestinationObject(state.returnDestination),
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
  },
  mutations: {
    setCurrentCountryPair(
      state: State,
      countryPair: {
        currentOriginCode: string
        currentDestinationCode: string
      },
    ): void {
      // Object.assign(state, countryPair)
      state.currentOriginCode = countryPair.currentOriginCode
      state.currentDestinationCode = countryPair.currentDestinationCode
    },
    setRestriction(state: State, restriction: PlainRestriction): void {
      state.restriction = restriction
    },
    setReturnRestriction(state: State, restriction: PlainRestriction): void {
      state.returnRestriction = restriction
    },
    setDestination(state: State, destination: PlainDestination): void {
      state.destination = destination
    },
    setReturnDestination(state: State, destination: PlainDestination): void {
      state.returnDestination = destination
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
