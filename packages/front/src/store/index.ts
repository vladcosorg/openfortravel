import { store } from 'quasar/wrappers'
import { LocaleMessageObject } from 'vue-i18n'
import Vuex from 'vuex'

import countryList from '@/shared/src/modules/country-list/country-list-store'
import countryPage from '@/front/src/pages/country/country-store'
import destinationPage from '@/front/src/pages/destination/destination-store'
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  countrySelectorLoading: boolean
  detectedCountry: string
  localizedRoutes: Record<string, string>
  locales: LocaleMessageObject
  serverLocale: string
  availableLocales: string[]
}

// eslint-disable-next-line import/no-unused-modules
export default store(({ Vue }) => {
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
      localizedRoutes: {},
      locales: {},
      serverLocale: 'en',
      availableLocales: [],
    },
    mutations: {
      setCountrySelectorLoading(state, value: boolean) {
        state.countrySelectorLoading = value
      },
      setDetectedCountry(state: StateInterface, country: string) {
        state.detectedCountry = country
      },
      setLocales(state: StateInterface, locales: LocaleMessageObject) {
        state.locales = locales
      },
      setAvailableLocales(state: StateInterface, locales: string[]) {
        state.availableLocales = locales
      },
      setServerLocale(state: StateInterface, serverLocale: string) {
        state.serverLocale = serverLocale
      },
    },

    actions: {},
    getters: {},
    strict: !!process.env.DEV,
  })
})