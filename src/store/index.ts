import { store } from 'quasar/wrappers'
import Vuex from 'vuex'
import { DestinationCountry, GroupedDestinations } from 'components/models'
import { I18nCountryList } from 'src/misc/I18nCountryList'

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
}

export default store(function ({ Vue }) {
  Vue.use(Vuex)

  const Store = new Vuex.Store<StateInterface>({
    state: {
      countryList: {},
      detectedCountry: 'us',
      countryDestinations: {},
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
    },
    modules: {
      // example
    },
    // examplee: 1,
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEV,
  })

  return Store
})
