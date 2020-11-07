import isEmpty from 'lodash/isEmpty'
import { Module } from 'vuex'

import {
  generateRestrictionListByOrigin,
  sortByDestination,
  wrapCollectionWithRichObject,
} from 'src/api/restrictions/helper'
import { PlainRestriction, Restriction, RestrictionStatus } from 'src/api/restrictions/models'
import { StateInterface } from 'src/store'

export type GroupedDestinations<T = PlainRestriction> = {
  [key in RestrictionStatus]?: T[]
}

class State {
  public destinations: PlainRestriction[] = []
}

export default {
  namespaced: true,
  state: function () {
    return new State()
  },
  getters: {
    getDestinationObjects: (state): GroupedDestinations<Restriction> => {
      const wrappedList = wrapCollectionWithRichObject(state.destinations)
      return groupByStatus(sortByDestination(wrappedList))
    },
  },
  mutations: {
    setDestinations(state: State, countryDestinations: PlainRestriction[]) {
      state.destinations = countryDestinations
    },
  },
  actions: {
    async fetchCountryDestinations({ commit, state, rootState }, originCode: string) {
      if (!isEmpty(state.destinations) && rootState.detectedCountry === originCode) {
        return
      }

      commit('setDestinations', await generateRestrictionListByOrigin(originCode))
    },
  },
} as Module<State, StateInterface>

function groupByStatus<T extends Restriction>(destinations: T[]): GroupedDestinations<T> {
  const allStatuses = Object.values(RestrictionStatus)
  return Object.assign(
    {},
    ...allStatuses.map((status) => ({
      [status]: destinations.filter((destination) => destination.status === status),
    })),
  ) as GroupedDestinations<T>
}
