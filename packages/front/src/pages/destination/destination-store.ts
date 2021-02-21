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
  wrapCollectionWithRichObject,
  wrapWithRichRestrictionObject,
} from '@/shared/src/api/restrictions/helper'
import {
  PlainRestriction,
  Restriction,
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
    restrictions: Restriction[]
  } = { restrictions: [] }
}

export default {
  namespaced: true,
  state: function () {
    return new State()
  },
  getters: {
    relatedRestrictionList: (state): Restriction[] =>
      wrapCollectionWithRichObject(state.relatedRestrictions.restrictions),
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
      result: { destinationCode: string; restrictions: Restriction[] },
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
      { commit, state, dispatch },
      destinationCode: string,
    ) {
      if (state.destination.countryCode === destinationCode) {
        return
      }

      const destination = await findOrigin(destinationCode)
      commit('setDestination', destination)

      if (destination.visitedRestrictedCountriesDaysAgo) {
        await dispatch('fetchRelatedRestrictions', destinationCode)
      }
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
