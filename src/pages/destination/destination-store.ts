import { Module } from 'vuex'

import { PlainRestriction } from 'src/api/restrictions/models'
import { findRestrictionByOriginAndDestination } from 'src/api/restrictions/repository'
import { StateInterface } from 'src/store'

class State {
  public restriction!: PlainRestriction
}

export default {
  namespaced: true,
  state: function () {
    return new State()
  },
  getters: {},
  mutations: {
    setRestriction(state: State, restriction: PlainRestriction): void {
      state.restriction = restriction
    },
  },
  actions: {
    async fetchRestriction(
      { commit, state },
      { originCode, destinationCode }: { originCode: string; destinationCode: string },
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
        await findRestrictionByOriginAndDestination(originCode, destinationCode),
      )
    },
  },
} as Module<State, StateInterface>
