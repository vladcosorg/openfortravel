import { saveContextToCookie } from '@/front/src/modules/visitor-context/cookies'
import type { RootState } from '@/front/src/store/state'
import type { MutationSignatures } from '@/front/src/store/types/mutations'
import { MutationTypes } from '@/front/src/store/types/mutations'
import { useCookies } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

import type { MutationTree } from 'vuex'

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
    if (value === undefined) {
      delete state.visitorContext[field]
    } else {
      state.visitorContext[field] = value
    }
  },

  [MutationTypes.mergeVisitorContext](
    state,
    { context, persistLocally = true },
  ) {
    state.visitorContext = Object.assign({}, state.visitorContext, context)

    if (!persistLocally) {
      return
    }

    saveContextToCookie(state.visitorContext)
  },

  [MutationTypes.replaceVisitorContext](
    state,
    { context, persistLocally = true },
  ) {
    state.visitorContext = context

    if (!persistLocally) {
      return
    }

    saveContextToCookie(state.visitorContext)
  },

  [MutationTypes.setVisitorOrigin](state, country) {
    state.visitorContext[RestrictionNodeType.ORIGIN] = country
    useCookies().set('country', country, { path: '/' })
  },
  [MutationTypes.setSlugs](state, slugs) {
    state.slugs = slugs
  },
}
