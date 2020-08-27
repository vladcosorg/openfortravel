import { store } from 'quasar/wrappers'
import Vuex from 'vuex'
import { colorsRgba } from 'quasar'

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
  // example: unknown;
  // count: unknown;
  countryList: [],
  detectedCountry?: string
}

export default store(function ({ Vue }) {
  Vue.use(Vuex)

  const Store = new Vuex.Store<StateInterface>({
    state: {
      countryList: [],
      detectedCountry: undefined
    },
    mutations: {
      setCountryList (state: StateInterface, list: []) {
        state.countryList = list
      },
      setDetectedCountry (state: StateInterface, country: string) {
        state.detectedCountry = country
      }
    },
    modules: {
      // example
    },
    // examplee: 1,
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEV
  })

  return Store
})
