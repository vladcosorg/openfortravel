import isEmpty from 'lodash/isEmpty'
import kebabCase from 'lodash/kebabCase'
import mapValues from 'lodash/mapValues'
import transform from 'lodash/transform'
import { Module } from 'vuex'

import { CountryList } from '@/shared/src/modules/country-list/country-list-helpers'

// eslint-disable-next-line import/no-unused-modules
export class CountryListState {
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
    return new CountryListState()
  },
  getters: {
    originLabels: (state) =>
      isEmpty(state.countryListOrigin)
        ? state.countryList
        : state.countryListOrigin,
    destinationLabels: (state) =>
      isEmpty(state.countryListDestination)
        ? state.countryList
        : state.countryListDestination,
    countryCodes(state): string[] {
      return Object.keys(state.countryList)
    },
    originKebabList(_state, getters) {
      return generateSlugKebabMap(getters.originLabels)
    },
    destinationKebabList(_state, getters) {
      return generateSlugKebabMap(getters.destinationLabels)
    },
  },
  mutations: {
    setCountryList(state: CountryListState, list: CountryList) {
      state.countryList = list
    },
    setSlugMigrationOriginMap(
      state: CountryListState,
      migrationMap: CountryList,
    ) {
      state.slugMigrationOriginMap = migrationMap
    },
    setSlugMigrationDestinationMap(
      state: CountryListState,
      migrationMap: CountryList,
    ) {
      state.slugMigrationDestinationMap = migrationMap
    },
    setCountryListOrigin(state: CountryListState, list: CountryList) {
      state.countryListOrigin = list
    },
    setCanonicalSlugToCountryCodeMap(
      state: CountryListState,
      list: CountryList,
    ) {
      state.canonicalSlugToCountryCodeMap = list
    },
    setCountryListDestination(state: CountryListState, list: CountryList) {
      state.countryListDestination = list
    },
    setPromise(state: CountryListState, promise: Promise<unknown>) {
      state.fetchingPromise = promise
    },
  },
  actions: {
    async fetchCountryList(
      { commit, state, getters },
      locale: string,
    ): Promise<void> {
      let countryList
      try {
        const response = await loadCountryListForLocale(locale)
        countryList = normalizeCountryListResponse(response)
      } catch {
        const response = await loadCountryListForLocale('en')
        countryList = normalizeCountryListResponse(response)
      }

      const oldOriginLabels = Object.assign({}, getters.originLabels)
      const oldDestinationLabels = Object.assign({}, getters.destinationLabels)
      commit('setCountryList', Object.freeze(countryList))

      if (locale === 'ru') {
        const response = await import(
          /* webpackChunkName: "declension-ru-origin" */
          '@/shared/src/i18n/declensions-ru/origin.json'
        )
        commit('setCountryListOrigin', response.default)
        const response2 = await import(
          /* webpackChunkName: "declension-ru-destination" */
          '@/shared/src/i18n/declensions-ru/destination.json'
        )
        commit('setCountryListDestination', response2.default)
      } else {
        commit('setCountryListOrigin', {})
        commit('setCountryListDestination', {})
      }

      if (!isEmpty(state.countryList)) {
        commit(
          'setSlugMigrationOriginMap',
          generateMigrationMap(getters.originLabels, oldOriginLabels),
        )
        commit(
          'setSlugMigrationDestinationMap',
          generateMigrationMap(getters.destinationLabels, oldDestinationLabels),
        )
      }

      if (isEmpty(state.canonicalSlugToCountryCodeMap)) {
        if (locale !== 'en') {
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          const response: any = await import(
            /* webpackChunkName: "lang-en" */
            'i18n-iso-countries/langs/en.json'
          )
          commit(
            'setCanonicalSlugToCountryCodeMap',
            generateSlugKebabMap(normalizeCountryListResponse(response)),
          )
        } else {
          commit(
            'setCanonicalSlugToCountryCodeMap',
            generateSlugKebabMap(countryList),
          )
        }
      }
    },
  },
} as Module<CountryListState, never>

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

function convertCountryListResponseToCountryLabelMap(
  countries: CountryList,
): Record<string, string> {
  const countryMap: CountryList = {}
  for (const [countryCode, countryName] of Object.entries(countries)) {
    countryMap[countryCode.toLowerCase()] = getFirstLabel(countryName)
  }

  return countryMap
}

export function convertCountryListResponseToCountrySlugMap(
  countries: CountryList,
): Record<string, string> {
  return mapValues(
    convertCountryListResponseToCountryLabelMap(countries),
    (countryLabel) => convertCountryLabelToSlug(countryLabel),
  )
}

function generateMigrationMap(current: CountryList, previous: CountryList) {
  const map: CountryList = {}
  Object.keys(previous).forEach((countryCode) => {
    map[kebabCase(previous[countryCode])] = kebabCase(current[countryCode])
  })

  return map
}

async function loadCountryListForLocale(locale: string) {
  // eslint-disable-next-line import/dynamic-import-chunkname
  return await import(
    /* webpackChunkName: "countries-[request]" */ `i18n-iso-countries/langs/${locale}.json`
  )
}

function convertCountryLabelToSlug(countryName: string): string {
  countryName = kebabCase(countryName.toLowerCase())
  return countryName
}
