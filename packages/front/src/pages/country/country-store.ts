import type { Module } from 'vuex'

import type { StateInterface } from '@/front/src/store/state'
import type {
  Destination,
  PlainDestination,
} from '@/shared/src/api/destinations/models'
import {
  generateRestrictionListByOrigin,
  wrapCollectionWithRichObject,
} from '@/shared/src/api/restrictions/helper'
import type {
  PlainRestriction,
  Restriction,
} from '@/shared/src/api/restrictions/models'
import { sortByStatusAndAlphabetically } from '@/shared/src/api/restrictions/sorters'

export type CountryMap = Map<string, Destination>

class State {
  public restrictions: PlainRestriction[] = []
  public countries: PlainDestination[] = []
  public originCode?: string
}

export default {
  namespaced: true,
  state: function () {
    return new State()
  },
  getters: {
    restrictionList: (state): Restriction[] => {
      const wrappedList = wrapCollectionWithRichObject(state.restrictions)
      return sortByStatusAndAlphabetically(wrappedList)
    },
    countryList: (state, getters, rootState, rootGetters): CountryMap =>
      new Map(Object.entries(rootGetters['wrappedHostRules'])),
  },
  mutations: {
    setRestrictions(
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
      state.restrictions = countryDestinations
      if (!forceRefetch) {
        state.originCode = originCode
      }
    },
    setCountries(state: State, countries: PlainDestination[]) {
      state.countries = countries
    },
  },
  actions: {
    async fetchRestrictions({ commit, state }, originCode: string) {
      if (state.originCode === originCode) {
        return
      }

      // We're using this flag to disable fetching from remote database on server for performance reasons
      // The data will be fetched on client thanks to the forceRefetch flag
      const isServer = (process.env.SERVER as unknown) as boolean
      commit('setRestrictions', {
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
