import { store } from 'quasar/wrappers'
import Vuex from 'vuex'

import countryList from 'src/modules/country-list/country-list-store'
import countryPage from 'src/pages/country/country-store'
import destinationPage from 'src/pages/destination/destination-store'
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  countrySelectorLoading: boolean
  detectedCountry: string
}

// eslint-disable-next-line import/no-unused-modules
export default store(function ({ Vue }) {
  Vue.use(Vuex)

  // eslint-disable-next-line import/no-named-as-default-member
  return new Vuex.Store<StateInterface>({
    modules: {
      destinationPage,
      countryPage,
      modules: {
        namespaced: true,
        modules: {
          countryList,
        },
      },
    },
    state: {
      countrySelectorLoading: false,
      detectedCountry: 'us',
    },
    mutations: {
      setCountrySelectorLoading(state, value: boolean) {
        state.countrySelectorLoading = value
      },
      setDetectedCountry(state: StateInterface, country: string) {
        state.detectedCountry = country
      },
    },

    actions: {},
    getters: {},
    strict: !!process.env.DEV,
  })
})
