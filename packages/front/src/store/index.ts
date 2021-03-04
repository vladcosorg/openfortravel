import { store } from 'quasar/wrappers'
import { LocaleMessageObject } from 'vue-i18n'
import Vuex, { Module } from 'vuex'

import countryPage from '@/front/src/pages/country/country-store'
import { getFullDestinationList } from '@/shared/src/api/destinations/helper'
import {
  Destination,
  MappedDestinationCollection,
  MappedPlainDestinationCollection,
} from '@/shared/src/api/destinations/models'
import { findMappedOrigins } from '@/shared/src/api/destinations/repository'
import { getFullRestrictionsListForOrigin } from '@/shared/src/api/restrictions/helper'
import {
  MappedPlainRestrictionCollection,
  MappedRestrictionCollection,
} from '@/shared/src/api/restrictions/models'
import { findMappedRestrictionsByOrigin } from '@/shared/src/api/restrictions/repository'
import { useCookies } from '@/shared/src/composables/use-plugins'
import type { CountryListState } from '@/shared/src/modules/country-list/country-list-store'
import countryList from '@/shared/src/modules/country-list/country-list-store'
import nationalities, {
  NationalityState,
} from '@/shared/src/modules/nationality/nationality-store'

export interface StateInterface {
  countrySelectorLoading: boolean
  detectedCountry: string | undefined
  localizedRoutes: Record<string, string>
  locales: LocaleMessageObject
  serverLocale: string
  availableLocales: string[]
  labeledLocales: Record<string, string>[]
  countryToContinentMap: Record<string, string>
  hostRules: MappedPlainDestinationCollection
}

export class RootState implements StateInterface {
  countrySelectorLoading = false
  detectedCountry = 'us'
  localizedRoutes = {}
  locales = {}
  serverLocale = 'en'
  availableLocales = []
  labeledLocales = []
  countryToContinentMap = {}
  hostRules: MappedPlainDestinationCollection = {}
  sharedRestrictions: {
    originCode?: string
    restrictions: MappedPlainRestrictionCollection
  } = { restrictions: {} }
}

// eslint-disable-next-line import/no-unused-modules
export default store(({ Vue }) => {
  Vue.use(Vuex)

  // eslint-disable-next-line import/no-named-as-default-member
  return new Vuex.Store<RootState>({
    modules: {
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
    state() {
      return new RootState()
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
      setHostRules(
        state: StateInterface,
        hostRules: MappedPlainDestinationCollection,
      ) {
        state.hostRules = hostRules
      },
      setSharedRestrictions(
        state: RootState,
        {
          originCode,
          restrictions,
        }: {
          originCode: string
          restrictions: MappedPlainRestrictionCollection
        },
      ) {
        state.sharedRestrictions = {
          originCode,
          restrictions,
        }
      },
    },

    actions: {
      async fetchHostRules({ commit }) {
        commit('setHostRules', await findMappedOrigins())
      },
      async fetchSharedRestrictions({ commit, state }, originCode: string) {
        if (state.sharedRestrictions.originCode === originCode) {
          return
        }

        commit('setSharedRestrictions', {
          originCode,
          restrictions: await findMappedRestrictionsByOrigin(originCode),
        })
      },
    },
    getters: {
      wrappedHostRules: (state): MappedDestinationCollection =>
        getFullDestinationList(state.hostRules),
      sharedRestrictions: (state): MappedRestrictionCollection => {
        if (!state.sharedRestrictions.originCode) {
          return {}
        }

        return getFullRestrictionsListForOrigin(
          state.sharedRestrictions.restrictions,
          state.sharedRestrictions.originCode,
        )
      },
      currentOrigin: (state, getters): Destination => {
        const destinations: MappedDestinationCollection =
          getters['wrappedHostRules']
        return destinations[state.detectedCountry]
      },
      detectedCountryWithFallback: (state): string =>
        state.detectedCountry ?? 'us',
    },
    strict: !!process.env.DEV,
  })
})
