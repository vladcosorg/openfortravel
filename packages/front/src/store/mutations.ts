import Vue from 'vue'
import type { MutationTree } from 'vuex'

import { saveContextToCookie } from '@/front/src/modules/visitor-context/cookies'
import type { RootState } from '@/front/src/store/state'
import type { MutationSignatures } from '@/front/src/store/types/mutations'
import { MutationTypes } from '@/front/src/store/types/mutations'
import { useCookies } from '@/shared/src/composables/use-plugins'

export const mutations: MutationTree<RootState> & MutationSignatures = {
  [MutationTypes.setCountryToContinentMap](state, map) {
    state.countryToContinentMap = map
  },
  [MutationTypes.setLocalizedLanguages](state, languages) {
    state.localizedLanguages = languages
  },
  [MutationTypes.setCountrySelectorLoading](state, value) {
    state.countrySelectorLoading = value
  },
  [MutationTypes.setDetectedCountry](state, country) {
    state.detectedCountry = country
    Vue.set(state.visitorContext, 'origin', country)
    Vue.set(state.visitorContext, 'citizenship', [country])
    useCookies().set('country', country, { path: '/' })
  },
  [MutationTypes.setLocales](state, locales) {
    state.locales = locales
  },
  [MutationTypes.setAvailableLocales](state, locales) {
    state.availableLocales = locales
  },
  [MutationTypes.setLabeledLocales](state, locales) {
    state.labeledLocales = locales
  },
  [MutationTypes.setServerLocale](state, serverLocale) {
    state.serverLocale = serverLocale
    useCookies().set('locale', serverLocale, { path: '/' })
  },
  [MutationTypes.setHostRules](state, hostRules) {
    state.hostRules = hostRules
  },
  [MutationTypes.setVisitorContextField](state, { field, value }) {
    Vue.set(state.visitorContext, field, value)
    saveContextToCookie(state.visitorContext)
  },
  [MutationTypes.setVisitorContext](state, { context, persist = true }) {
    state.visitorContext = context

    if (persist) {
      saveContextToCookie(context)
    }
  },
}
