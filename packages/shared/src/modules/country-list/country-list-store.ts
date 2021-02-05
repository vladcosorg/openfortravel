import isEmpty from 'lodash/isEmpty'
import kebabCase from 'lodash/kebabCase'
import mapValues from 'lodash/mapValues'
import transform from 'lodash/transform'
import { Module } from 'vuex'

import { useVueI18n } from '@/shared/src/composables/use-plugins'
import { transformKeys } from '@/shared/src/misc/misc'
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

export type GroupedCountryList = Record<string, string[]>

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    originByContinent(_state, getters, rootState: any) {
      return groupCountriesByContinents(
        rootState.countryToContinentMap,
        getters.originLabels,
      )
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
      const oldOriginLabels = Object.assign({}, getters.originLabels)
      const oldDestinationLabels = Object.assign({}, getters.destinationLabels)

      const response = await loadCountryListForLocale(locale)
      commit('setCountryList', Object.freeze(response.origin))

      if (locale !== 'ru') {
        commit('setCountryListOrigin', {})
        commit('setCountryListDestination', {})
      } else {
        commit('setCountryListOrigin', response.origin)
        commit('setCountryListDestination', response.destination)
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
            generateSlugKebabMap(response.origin),
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

export function generateSlugKebabMap(
  list: CountryList,
): Record<string, string> {
  return Object.keys(list).reduce<Record<string, string>>((kebabList, key) => {
    kebabList[kebabCase(list[key])] = key
    return kebabList
  }, {})
}

export function generateCodeToSlugMap(
  list: CountryList,
): Record<string, string> {
  return mapValues(list, (countryName) => kebabCase(countryName))
}

export function convertCountryNameToSlug(countryName: string): string {
  return kebabCase(countryName)
}

type DynamicCountryListResponse = {
  default: {
    countries: CountryList
  }
}
export function normalizeCountryListResponse(
  response: DynamicCountryListResponse,
): CountryList {
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
  for (const countryCode of Object.keys(previous)) {
    map[kebabCase(previous[countryCode])] = kebabCase(current[countryCode])
  }

  return map
}

export async function loadSimpleCountryList(
  locale: string,
): Promise<DynamicCountryListResponse> {
  try {
    // eslint-disable-next-line import/dynamic-import-chunkname
    return await import(
      /* webpackChunkName: "countries-[request]" */ `i18n-iso-countries/langs/${locale}.json`
    )
  } catch {
    // eslint-disable-next-line import/dynamic-import-chunkname
    return ((await import(
      /* webpackChunkName: "countries-[request]" */ 'i18n-iso-countries/langs/en.json'
    )) as unknown) as DynamicCountryListResponse
  }
}

export async function loadDualCountryListForLocale(): Promise<{
  origin: CountryList
  destination: CountryList
}> {
  return {
    origin: (
      await import(
        /* webpackChunkName: "declension-ru-origin" */
        '@/shared/src/i18n/declensions-ru/origin.json'
      )
    ).default,
    destination: (
      await import(
        /* webpackChunkName: "declension-ru-destination" */
        '@/shared/src/i18n/declensions-ru/destination.json'
      )
    ).default,
  }
}

export async function loadCountryListForLocale(
  locale: string,
): Promise<{ origin: CountryList; destination: CountryList }> {
  if (locale === 'ru') {
    return await loadDualCountryListForLocale()
  }

  const list = normalizeCountryListResponse(await loadSimpleCountryList(locale))
  return {
    origin: list,
    destination: list,
  }
}

function convertCountryLabelToSlug(countryName: string): string {
  countryName = kebabCase(countryName.toLowerCase())
  return countryName
}

function groupCountriesByContinents(
  continentList: string,
  countryList: Record<string, string>,
): Record<string, { value: string; label: string }[]> {
  const { t } = useVueI18n()

  let output = Object.entries<string>(continentList).reduce<
    Record<string, { value: string; label: string }[]>
  >(
    (formattedList, [countryISO, continent]) => {
      const countryLabel = countryList[countryISO]

      if (!formattedList[continent]) {
        formattedList[continent] = []
      }

      formattedList[continent].push({ value: countryISO, label: countryLabel })

      return formattedList
    },
    { eu: [], na: [], as: [], sa: [] },
  )

  output = transformKeys(
    output,
    (continentID) => t(`misc.continents.${continentID}`) as string,
  )

  output = mapValues(output, (countryList) =>
    countryList.sort((a, b) => a.label.localeCompare(b.label)),
  )

  return output
}
