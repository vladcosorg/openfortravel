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
  wrapWithRichRestrictionObject,
} from '@/shared/src/api/restrictions/helper'
import {
  PlainRestriction,
  Restriction,
} from '@/shared/src/api/restrictions/models'
import { findRestrictionByOriginAndDestination } from '@/shared/src/api/restrictions/repository'

class State {
  public restriction = createDummyPlainRestriction()
  public returnRestriction = createDummyPlainRestriction()
  public destination = createDummyPlainDestination()
}

export default {
  namespaced: true,
  state: function () {
    return new State()
  },
  getters: {
    getRestriction: (state): Restriction =>
      wrapWithRichRestrictionObject(state.restriction),
    getReturnRestriction: (state): Restriction =>
      wrapWithRichRestrictionObject(state.returnRestriction),
    getDestination: (state): Destination =>
      wrapWithRichDestinationObject(state.destination),
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
    async fetchDestination({ commit, state }, destinationCode: string) {
      if (state.destination.countryCode === destinationCode) {
        return
      }
      commit('setDestination', await findOrigin(destinationCode))
    },
  },
} as Module<State, StateInterface>
