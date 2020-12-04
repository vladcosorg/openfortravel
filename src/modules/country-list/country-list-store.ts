import isEmpty from 'lodash/isEmpty'
import kebabCase from 'lodash/kebabCase'
import transform from 'lodash/transform'
import { Module } from 'vuex'

import {
  CountryList,
  transformCodeToDestinationSlug,
  transformCodeToOriginSlug,
} from 'src/modules/country-list/country-list-helpers'
import { StateInterface } from 'src/store'

class State {
  countryList: CountryList = {}
  countryListOrigin: CountryList = {}
  countryListDestination?: CountryList
  previousCountryList: CountryList = {}
  fetchingPromise: Promise<unknown> = Promise.resolve()
}

export default {
  namespaced: true,
  state: function () {
    return new State()
  },
  getters: {
    originLabels: (state) => {
      return isEmpty(state.countryListOrigin)
        ? state.countryList
        : state.countryListOrigin
    },
    destinationLabels: (state) => {
      return isEmpty(state.countryListOrigin)
        ? state.countryList
        : state.countryListDestination
    },
    countryCodes(state): string[] {
      return Object.keys(state.countryList)
    },
    originKebabList(state, getters) {
      // eslint-disable-next-line unicorn/no-reduce
      return (getters.countryCodes as string[]).reduce<Record<string, string>>(
        (kebabList, key) => {
          kebabList[kebabCase(getters.originLabels[key])] = key
          return kebabList
        },
        {},
      )
    },
    destinationKebabList(state, getters) {
      // eslint-disable-next-line unicorn/no-reduce
      return Object.keys(state.countryList).reduce<Record<string, string>>(
        (kebabList, key) => {
          kebabList[kebabCase(getters.destinationLabels[key])] = key
          return kebabList
        },
        {},
      )
    },
    getPreviousToCurrentCountryList(state, getters) {
      // eslint-disable-next-line unicorn/no-reduce
      return Object.keys(state.previousCountryList).reduce<
        Record<string, string>
      >((kebabList, key) => {
        kebabList[
          transformCodeToOriginSlug(key, state.previousCountryList[key])
        ] = getters.originLabels[key]
        kebabList[
          transformCodeToDestinationSlug(key, state.previousCountryList[key])
        ] = getters.originLabels[key]
        return kebabList
      }, {})
    },
  },
  mutations: {
    setCountryList(state: State, list: CountryList) {
      state.previousCountryList = state.countryList
      state.countryList = list
    },
    setCountryListOrigin(state: State, list: CountryList) {
      state.countryListOrigin = list
    },
    setCountryListDestination(state: State, list: CountryList) {
      state.countryListDestination = list
    },
    setPromise(state: State, promise: Promise<unknown>) {
      state.fetchingPromise = promise
    },
  },
  actions: {
    fetchCountryList({ commit }, locale: string) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      commit(
        'setPromise',
        import(
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

          if (locale !== 'ru') {
            commit('setCountryListOrigin', {})
            commit('setCountryListDestination', {})
            return response
          }

          return Promise.all([
            import('src/i18n/declensions-ru/origin.json').then((response) => {
              commit('setCountryListOrigin', response.default)
            }),
            import('src/i18n/declensions-ru/destination.json').then(
              (response) => {
                commit('setCountryListDestination', response.default)
              },
            ),
          ])
        }),
      )
    },
  },
} as Module<State, StateInterface>

function getFirstLabel(label: string | string[]): string {
  if (Array.isArray(label)) {
    ;[label] = label
  }

  return label
}
