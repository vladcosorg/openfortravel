import { Module } from 'vuex'

import {
  generateRestrictionListByOrigin,
  sortByDestination,
  wrapCollectionWithRichObject,
} from 'src/api/restrictions/helper'
import {
  PlainRestriction,
  Restriction,
  RestrictionStatus,
} from 'src/api/restrictions/models'
import { StateInterface } from 'src/store'

export type GroupedDestinations<T = PlainRestriction> = {
  [key in RestrictionStatus]?: T[]
}

class State {
  public destinations: PlainRestriction[] = []
  public originCode?: string
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
    setDestinations(
      state: State,
      {
        originCode,
        countryDestinations,
      }: { originCode: string; countryDestinations: PlainRestriction[] },
    ) {
      state.destinations = countryDestinations
      state.originCode = originCode
    },
  },
  actions: {
    async fetchCountryDestinations({ commit, state }, originCode: string) {
      if (state.originCode === originCode) {
        return
      }

      commit('setDestinations', {
        countryDestinations: await generateRestrictionListByOrigin(originCode),
        originCode,
      })
    },
  },
} as Module<State, StateInterface>

function groupByStatus<T extends Restriction>(
  destinations: T[],
): GroupedDestinations<T> {
  const allStatuses = Object.values(RestrictionStatus)
  return Object.assign(
    {},
    ...allStatuses.map((status) => ({
      [status]: destinations.filter(
        (destination) => destination.status === status,
      ),
    })),
  ) as GroupedDestinations<T>
}
