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
        forceRefetch,
      }: {
        originCode: string
        countryDestinations: PlainRestriction[]
        forceRefetch: boolean
      },
    ) {
      state.destinations = countryDestinations
      if (!forceRefetch) {
        state.originCode = originCode
      }
    },
  },
  actions: {
    async fetchCountryDestinations({ commit, state }, originCode: string) {
      if (state.originCode === originCode) {
        return
      }

      // We're using this flag to disable fetching from remote database on server for performance reasons
      // The data will be fetched on client thanks to the forceRefetch flag
      // const isServer = (process.env.SERVER as unknown) as boolean
      const isServer = false
      commit('setDestinations', {
        countryDestinations: await generateRestrictionListByOrigin(
          originCode,
          isServer,
        ),
        originCode,
        forceRefetch: isServer,
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
