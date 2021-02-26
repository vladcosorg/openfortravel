import { Module } from 'vuex'

import { StateInterface } from '@/front/src/store'
import {
  createDummyPlainDestination,
  wrapWithRichDestinationObject,
} from '@/shared/src/api/destinations/helper'
import {
  Destination,
  PlainDestination,
} from '@/shared/src/api/destinations/models'
import { findOrigin } from '@/shared/src/api/destinations/repository'
import {
  createDummyPlainRestriction,
  fillMissingRestrictionsWithFallbacks,
  wrapCollectionWithRichObject,
  wrapWithRichRestrictionObject,
} from '@/shared/src/api/restrictions/helper'
import {
  PlainRestriction,
  PlainRestrictionCollection,
  Restriction,
  RestrictionCollection,
} from '@/shared/src/api/restrictions/models'
import {
  findRestrictionByOriginAndDestination,
  findRestrictionsByDestination,
} from '@/shared/src/api/restrictions/repository'

class State {
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
      console.log('called')
      if (!state.relatedRestrictions.destinationCode) {
        return []
      }

      return wrapCollectionWithRichObject(
        fillMissingRestrictionsWithFallbacks(
          state.relatedRestrictions.restrictions,
          state.relatedRestrictions.destinationCode,
          'origin',
        ),
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
  },
  mutations: {
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
    async fetchRestriction(
      { commit, state },
      {
        originCode,
        destinationCode,
      }: { originCode: string; destinationCode: string },
    ) {
      if (
        state.restriction &&
        state.restriction.origin === originCode &&
        state.restriction.destination === destinationCode
      ) {
        return
      }
      commit(
        'setRestriction',
        await findRestrictionByOriginAndDestination(
          originCode,
          destinationCode,
        ),
      )
    },
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
    async fetchDestination(
      { commit, state, dispatch, rootGetters },
      destinationCode: string,
    ) {
      if (state.destination.countryCode === destinationCode) {
        return
      }

      const destination = rootGetters['wrappedHostRules'][destinationCode]
      commit('setDestination', destination)

      await dispatch('fetchRelatedRestrictions', destinationCode)
    },
    async fetchReturnDestination({ commit, state }, destinationCode: string) {
      if (state.returnDestination.countryCode === destinationCode) {
        return
      }
      commit('setReturnDestination', await findOrigin(destinationCode))
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
  },
} as Module<State, StateInterface>
