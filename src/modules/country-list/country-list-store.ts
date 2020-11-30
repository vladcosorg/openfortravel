import transform from 'lodash/transform'
import { Module } from 'vuex'

import {
  CountryList,
  transformCodeToSlug,
} from 'src/modules/country-list/country-list-helpers'
import { StateInterface } from 'src/store'

class State {
  countryList: CountryList = {}
  previousCountryList: CountryList = {}
  fetchingPromise: Promise<unknown> = Promise.resolve()
}

export default {
  namespaced: true,
  state: function () {
    return new State()
  },
  getters: {
    getLabelByCountryCode: (state) => (countryCode: string) => {
      return state.countryList[countryCode]
    },
    getCountryListObjects(state, getters) {
      return (getters.getCountryCodes as string[]).map((key) => ({
        value: key.toLowerCase(),
        label: state.countryList[key],
      }))
    },
    getCountryCodes(state): string[] {
      return Object.keys(state.countryList)
    },
    getCountryKebabList(state) {
      // eslint-disable-next-line unicorn/no-reduce
      return Object.keys(state.countryList).reduce<Record<string, string>>(
        (kebabList, key) => {
          kebabList[transformCodeToSlug(key)] = key
          return kebabList
        },
        {},
      )
    },
    getPreviousToCurrentCountryList(state) {
      // eslint-disable-next-line unicorn/no-reduce
      return Object.keys(state.previousCountryList).reduce<
        Record<string, string>
      >((kebabList, key) => {
        kebabList[
          transformCodeToSlug(key, state.previousCountryList[key])
        ] = transformCodeToSlug(key)
        return kebabList
      }, {})
    },
  },
  mutations: {
    setCountryList(state: State, list: CountryList) {
      state.previousCountryList = state.countryList
      state.countryList = list
    },
    setPromise(state: State, promise: Promise<unknown>) {
      state.fetchingPromise = promise
    },
  },
  actions: {
    fetchCountryList({ commit }, locale: string) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const promise = import(
        /* webpackChunkName: "country-list-[request]" */ `i18n-iso-countries/langs/${locale}.json`
      ).then((response) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        let translations = response.default.countries as CountryList
        translations = transform(
          translations,
          (list: CountryList, label: string | string[], code: string) => {
            list[code.toLowerCase()] = getFirstLabel(label)
          },
        )
        commit('setCountryList', Object.freeze(translations))
      })
      commit('setPromise', promise)
    },
  },
} as Module<State, StateInterface>

function getFirstLabel(label: string | string[]): string {
  if (Array.isArray(label)) {
    ;[label] = label
  }

  return label
}
