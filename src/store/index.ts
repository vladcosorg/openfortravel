import isEmpty from 'lodash/isEmpty'
import mapValues from 'lodash/mapValues'
import { store } from 'quasar/wrappers'
import Vuex from 'vuex'

import {
  Destination,
  getDestination,
  IncompletePlainDestination,
  PlainDestination,
} from 'src/api/destinations'
import { getOrigin, PlainOrigin } from 'src/api/origin'
import { CountryList } from 'src/misc/country-list'
import { Origin } from 'src/models/origin'
import {
  generateGroupedDestinationList,
  GroupedDestinations,
} from 'src/repositories/country-destinations'

// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  // example: unknown;a
  // count: unknown;
  countrySelectorLoading: boolean
  countryList: CountryList
  detectedCountry: string
  countryDestinations: GroupedDestinations
  origin: PlainOrigin
  destination: IncompletePlainDestination
}

// eslint-disable-next-line import/no-unused-modules
export default store(function ({ Vue }) {
  Vue.use(Vuex)

  // eslint-disable-next-line import/no-named-as-default-member
  return new Vuex.Store<StateInterface>({
    state: {
      countrySelectorLoading: false,
      countryList: {},
      detectedCountry: 'us',
      countryDestinations: {},
      origin: { countryCode: 'us', reference: '' },
      destination: { countryCode: 'us' },
    },
    mutations: {
      setCountrySelectorLoading(state, value: boolean) {
        state.countrySelectorLoading = value
      },
      setCountryList(state: StateInterface, list: CountryList) {
        state.countryList = list
      },
      setDetectedCountry(state: StateInterface, country: string) {
        state.detectedCountry = country
      },
      setCountryDestinations(
        state: StateInterface,
        countryDestinations: GroupedDestinations,
      ) {
        state.countryDestinations = countryDestinations
      },
      setOrigin(state, origin: PlainOrigin) {
        state.origin = origin
      },
      setDestination(state, destination: PlainDestination) {
        state.destination = destination
      },
    },

    actions: {
      async loadOrigin({ commit, state }, countryCode: string) {
        if (state.origin.countryCode === countryCode) {
          return
        }
        commit('setOrigin', await getOrigin(countryCode))
      },
      async loadDestination(
        { commit, state },
        {
          originCode,
          destinationCode,
        }: { originCode: string; destinationCode: string },
      ) {
        if (state.destination.countryCode === destinationCode) {
          return
        }
        commit(
          'setDestination',
          await getDestination(originCode, destinationCode),
        )
      },
      async fetchCountryDestinations({ commit, state }, originCode: string) {
        if (
          !isEmpty(state.countryDestinations) &&
          state.detectedCountry === originCode
        ) {
          return
        }

        commit(
          'setCountryDestinations',
          await generateGroupedDestinationList(originCode),
        )
      },
    },
    getters: {
      getCountryDestinationsObjects: (state) => {
        return mapValues(state.countryDestinations, (group) => {
          if (group === undefined) {
            return group
          }

          return group.map((destination) => new Destination(destination))
        })
      },
      currentDestination: (state) => {
        if (!state.destination) {
          return
        }

        return new Destination(state.destination)
      },
      currentOrigin: (state) => {
        if (!state.origin) {
          return
        }

        return new Origin(state.origin)
      },
    },
    // examplee: 1,
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEV,
  })
})
