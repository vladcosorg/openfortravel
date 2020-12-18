import { Module } from 'vuex'

import { StateInterface } from '@/front/src/store'
import {
  generateRestrictionListByOrigin,
  sortByDestination,
  wrapCollectionWithRichObject,
} from '@/shared/src/api/restrictions/helper'
import {
  PlainRestriction,
  Restriction,
  RestrictionStatus,
} from '@/shared/src/api/restrictions/models'

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
