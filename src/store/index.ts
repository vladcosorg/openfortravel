import { store } from 'quasar/wrappers'
import {
  Destination,
  getDestination,
  PlainDestination,
} from 'src/api/Destinations'
import { getOrigin, PlainOrigin } from 'src/api/Origin'
import { I18nCountryList } from 'src/misc/I18nCountryList'
import { Origin } from 'src/models/Origin'
import { GroupedDestinations } from 'src/repositories/CountryDestinations'
import Vuex from 'vuex'

// import example from './module-example';
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
  countryList: I18nCountryList
  detectedCountry: string
  countryDestinations: GroupedDestinations
  origin: Partial<PlainOrigin>
  destination: Partial<PlainDestination>
}

export default store(function ({ Vue }) {
  Vue.use(Vuex)

  return new Vuex.Store<StateInterface>({
    state: {
      countryList: {},
      detectedCountry: 'us',
      countryDestinations: {},
      origin: null,
      destination: null,
    },
    mutations: {
      setCountryList(state: StateInterface, list: I18nCountryList) {
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
      resetOriginAndDestination(state) {
        state.origin = {}
        state.destination = {
          countryCode: 'none',
          isDummy: true,
        }
      },
    },
    modules: {
      // example
    },
    actions: {
      async loadOrigin({ commit }, countryCode: string) {
        commit('setOrigin', await getOrigin(countryCode))
      },
      async loadDestination(
        { commit },
        {
          originCode,
          destinationCode,
        }: { originCode: string; destinationCode: string },
      ) {
        commit(
          'setDestination',
          await getDestination(originCode, destinationCode),
        )
      },
    },
    getters: {
      currentDestination: (state) => {
        if (!state.destination) {
          return undefined
        }

        return new Destination(state.destination)
      },
      currentOrigin: (state) => {
        if (!state.origin) {
          return undefined
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
