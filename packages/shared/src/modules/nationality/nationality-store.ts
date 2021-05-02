import type { Module } from 'vuex'

import { normalizeFormat } from '@/shared/src/modules/nationality/nationality-helpers'

export type Nationalities = Record<string, string>
// eslint-disable-next-line import/no-unused-modules
export class NationalityState {
  list: Nationalities = {}
}

export default {
  namespaced: true,
  state() {
    return new NationalityState()
  },
  getters: {},
  mutations: {
    setNationalities(state: NationalityState, nationalities: Nationalities) {
      state.list = nationalities
    },
  },
  actions: {
    async fetch({ commit }, locale: string): Promise<void> {
      if (!['en', 'de', 'fr'].includes(locale)) {
        commit('setNationalities', {})
        return
      }

      // eslint-disable-next-line import/dynamic-import-chunkname
      const response = (await import(
        /* webpackChunkName: "nationality-[request]" */ `i18n-nationality/langs/${locale}.json`
      )) as { default: { nationalities: Nationalities } }

      commit('setNationalities', normalizeFormat(response.default.nationalities))
    },
  },
} as Module<NationalityState, never>
