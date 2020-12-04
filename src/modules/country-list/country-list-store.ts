import isEmpty from 'lodash/isEmpty'
import kebabCase from 'lodash/kebabCase'
import transform from 'lodash/transform'
import { Module } from 'vuex'

import { CountryList } from 'src/modules/country-list/country-list-helpers'
import { StateInterface } from 'src/store'

class State {
  countryList: CountryList = {}
  countryListOrigin: CountryList = {}
  countryListDestination: CountryList = {}
  canonicalSlugToCountryCodeMap: CountryList = {}
  slugMigrationOriginMap: CountryList = {}
  slugMigrationDestinationMap: CountryList = {}
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
      return generateSlugKebabMap(getters.originLabels)
    },
    destinationKebabList(state, getters) {
      return generateSlugKebabMap(getters.destinationLabels)
    },
  },
  mutations: {
    setCountryList(state: State, list: CountryList) {
      state.countryList = list
    },
    setSlugMigrationOriginMap(state: State, migrationMap: CountryList) {
      state.slugMigrationOriginMap = migrationMap
    },
    setSlugMigrationDestinationMap(state: State, migrationMap: CountryList) {
      state.slugMigrationDestinationMap = migrationMap
    },
    setCountryListOrigin(state: State, list: CountryList) {
      state.countryListOrigin = list
    },
    setCanonicalSlugToCountryCodeMap(state: State, list: CountryList) {
      state.canonicalSlugToCountryCodeMap = list
    },
    setCountryListDestination(state: State, list: CountryList) {
      state.countryListDestination = list
    },
    setPromise(state: State, promise: Promise<unknown>) {
      state.fetchingPromise = promise
    },
  },
  actions: {
    fetchCountryList({ commit, state, getters }, locale: string) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      commit(
        'setPromise',
        import(
          /* webpackChunkName: "country-list-[request]" */ `i18n-iso-countries/langs/${locale}.json`
        ).then((response) => {
          const countryList = normalizeCountryListResponse(response)

          const oldOriginLabels = getters.originLabels
          const oldDestinationLabels = getters.destinationLabels
          commit('setCountryList', Object.freeze(countryList))

          const promises = []

          if (locale === 'ru') {
            promises.push(
              import('src/i18n/declensions-ru/origin.json').then((response) => {
                commit('setCountryListOrigin', response.default)
              }),
              import('src/i18n/declensions-ru/destination.json').then(
                (response) => {
                  commit('setCountryListDestination', response.default)
                },
              ),
            )
          } else {
            commit('setCountryListOrigin', {})
            commit('setCountryListDestination', {})
          }

          Promise.all(promises).then(() => {
            if (!isEmpty(state.countryList)) {
              commit(
                'setSlugMigrationOriginMap',
                generateMigrationMap(countryList, oldOriginLabels),
              )
              commit(
                'setSlugMigrationDestinationMap',
                generateMigrationMap(countryList, oldDestinationLabels),
              )
            }
          })

          if (isEmpty(state.canonicalSlugToCountryCodeMap)) {
            if (locale !== 'en') {
              promises.push(
                import('i18n-iso-countries/langs/en.json').then(
                  //eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (response: any) => {
                    commit(
                      'setCanonicalSlugToCountryCodeMap',
                      generateSlugKebabMap(
                        normalizeCountryListResponse(response),
                      ),
                    )
                  },
                ),
              )
            } else {
              commit(
                'setCanonicalSlugToCountryCodeMap',
                generateSlugKebabMap(countryList),
              )
            }
          }

          return Promise.all(promises)
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

function generateSlugKebabMap(list: CountryList): Record<string, string> {
  return Object.keys(list).reduce<Record<string, string>>((kebabList, key) => {
    kebabList[kebabCase(list[key])] = key
    return kebabList
  }, {})
}
function normalizeCountryListResponse(response: {
  default: { countries: CountryList }
}) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  const translations = response.default.countries
  return transform(
    translations,
    (list: CountryList, label: string | string[], code: string) => {
      list[code.toLowerCase()] = getFirstLabel(label)
    },
  )
}

function generateMigrationMap(current: CountryList, previous: CountryList) {
  const map: CountryList = {}
  Object.keys(previous).forEach((countryCode) => {
    map[kebabCase(previous[countryCode])] = kebabCase(current[countryCode])
  })

  return map
}
