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
  sortByDestination,
  wrapCollectionWithRichObject,
} from '@/shared/src/api/restrictions/helper'
import {
  PlainRestriction,
  Restriction,
  RestrictionStatus,
} from '@/shared/src/api/restrictions/models'
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
      return sortedByStatus(sortByDestination(wrappedList))
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

      getCountryCodes().forEach((countryCode) => {
        if (countryObjects.has(countryCode)) {
          return
        }

        countryObjects.set(
          countryCode,
          createDummyDestination({
            countryCode,
          }),
        )
      })

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
      // const isServer = (process.env.SERVER as unknown) as boolean
      const isServer = false
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

function sortedByStatus(destinations: Restriction[]): Restriction[] {
  const allStatuses = Object.values(RestrictionStatus)
  const grouped = Object.assign(
    {},
    ...allStatuses.map((status) => ({
      [status]: destinations.filter(
        (destination) => destination.status === status,
      ),
    })),
  ) as Record<string, Restriction[]>
  return Object.values(grouped).flat()
}
