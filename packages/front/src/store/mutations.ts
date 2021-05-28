import Vue from 'vue'
import type { MutationTree } from 'vuex'

import { saveContextToCookie } from '@/front/src/modules/visitor-context/cookies'
import type { RootState } from '@/front/src/store/state'
import type { MutationSignatures } from '@/front/src/store/types/mutations'
import { MutationTypes } from '@/front/src/store/types/mutations'
import { useCookies } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

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

    switch (field) {
      case RestrictionNodeType.VACCINATED:
        // eslint-disable-next-line unicorn/no-useless-undefined
        Vue.set(state.visitorContext, RestrictionNodeType.RECOVERY, undefined)
        break
    }

    saveContextToCookie(state.visitorContext)
  },
  [MutationTypes.setVisitorContext](state, { context, persist = true }) {
    ;(state.visitorContext as VisitorProfile) = context

    if (persist) {
      saveContextToCookie(context)
    }
  },
  [MutationTypes.setVisitorOrigin](state, country) {
    Vue.set(state.visitorContext, RestrictionNodeType.ORIGIN, country)
    useCookies().set('country', country, { path: '/' })
  },
}
