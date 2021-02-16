import { store } from 'quasar/wrappers'
import { LocaleMessageObject } from 'vue-i18n'
import Vuex, { Module } from 'vuex'

import countryPage from '@/front/src/pages/country/country-store'
import { useCookies } from '@/shared/src/composables/use-plugins'
import type { CountryListState } from '@/shared/src/modules/country-list/country-list-store'
import countryList from '@/shared/src/modules/country-list/country-list-store'
import nationalities, {
  NationalityState,
} from '@/shared/src/modules/nationality/nationality-store'

import destinationPage from '../pages/destination/destination-store'

export interface StateInterface {
  countrySelectorLoading: boolean
  detectedCountry: string | undefined
  localizedRoutes: Record<string, string>
  locales: LocaleMessageObject
  serverLocale: string
  availableLocales: string[]
  labeledLocales: Record<string, string>[]
  countryToContinentMap: Record<string, string>
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
          countryList: countryList as Module<CountryListState, StateInterface>,
          nationalities: nationalities as Module<
            NationalityState,
            StateInterface
          >,
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
      labeledLocales: [],
      countryToContinentMap: {},
    },
    mutations: {
      setCountryToContinentMap(state, map: Record<string, string>) {
        state.countryToContinentMap = map
      },
      setCountrySelectorLoading(state, value: boolean) {
        state.countrySelectorLoading = value
      },
      setDetectedCountry(state: StateInterface, country: string) {
        state.detectedCountry = country
        useCookies().set('country', country, { path: '/' })
      },
      setLocales(state: StateInterface, locales: LocaleMessageObject) {
        state.locales = locales
      },
      setAvailableLocales(state: StateInterface, locales: string[]) {
        state.availableLocales = locales
      },
      setLabeledLocales(
        state: StateInterface,
        locales: StateInterface['labeledLocales'],
      ) {
        state.labeledLocales = locales
      },
      setServerLocale(state: StateInterface, serverLocale: string) {
        state.serverLocale = serverLocale
        useCookies().set('locale', serverLocale, { path: '/' })
      },
    },

    actions: {},
    getters: {
      detectedCountryWithFallback: (state): string =>
        state.detectedCountry ?? 'us',
    },
    strict: !!process.env.DEV,
  })
})
