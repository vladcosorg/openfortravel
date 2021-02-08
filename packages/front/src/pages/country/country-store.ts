import { Module } from 'vuex'

import { StateInterface } from '@/front/src/store'
import {
  createDummyDestination,
  wrapWithRichDestinationObject,
} from '@/shared/src/api/destinations/helper'
import {
  Destination,
  PlainDestination,
} from '@/shared/src/api/destinations/models'
import { findOrigins } from '@/shared/src/api/destinations/repository'
import {
  generateRestrictionListByOrigin,
  wrapCollectionWithRichObject,
} from '@/shared/src/api/restrictions/helper'
import {
  PlainRestriction,
  Restriction,
} from '@/shared/src/api/restrictions/models'
import { sortByStatusAndAlphabetically } from '@/shared/src/api/restrictions/sorters'
import { getCountryCodes } from '@/shared/src/modules/country-list/country-list-helpers'

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
    countryList: (state): CountryMap => {
      const countryObjects = state.countries.reduce(
        (map, plainCountry) =>
          map.set(
            plainCountry.countryCode,
            wrapWithRichDestinationObject(plainCountry),
          ),
        new Map(),
      )

      for (const countryCode of getCountryCodes()) {
        if (countryObjects.has(countryCode)) {
          continue
        }

        countryObjects.set(
          countryCode,
          createDummyDestination({
            countryCode,
          }),
        )
      }

      return countryObjects
    },
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
    async fetchCountries({ commit, state }) {
      if (state.countries.length > 0) {
        return
      }
      commit('setCountries', await findOrigins())
    },
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
