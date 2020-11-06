import { store } from 'quasar/wrappers'
import Vuex from 'vuex'

import { CountryList } from 'src/misc/country-list'
import countryPage from 'src/pages/country/country-store'
import destinationPage from 'src/pages/destination/destination-store'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  countrySelectorLoading: boolean
  countryList: CountryList
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
    },
    state: {
      countrySelectorLoading: false,
      countryList: {},
      detectedCountry: 'us',
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
    },

    actions: {},
    getters: {
      getCountryListObjects(state) {
        return Object.keys(state.countryList).map((key) => ({
          value: key.toLowerCase(),
          label: state.countryList[key],
        }))
      },
    },
    strict: !!process.env.DEV,
  })
})
