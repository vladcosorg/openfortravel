import isEmpty from 'lodash/isEmpty'
import kebabCase from 'lodash/kebabCase'
import mapValues from 'lodash/mapValues'

import { useVueI18n } from '@/shared/src/composables/use-plugins'
import { transformKeys } from '@/shared/src/misc/misc'
import type { CountryList } from '@/shared/src/modules/country-list/country-list-helpers'
import type { CountrySlugType } from '@/shared/src/modules/country-list/country-list-types'

import type { Module } from 'vuex'

export class CountryListState {
  countryList: CountryList = {}
  countryListOrigin: CountryList = {}
  countryListDestination: CountryList = {}
  slugMap: CountryList = {}
  originSlugMap: CountryList = {}
  destinationSlugMap: CountryList = {}
}

export type CountryListTypes = { [index in CountrySlugType]: CountryList }

export default {
  namespaced: true,
  state: function () {
    return new CountryListState()
  },
  getters: {
    countryListOrigin(state): CountryListState['countryListOrigin'] {
      return isEmpty(state.countryListOrigin)
        ? state.countryList
        : state.countryListOrigin
    },
    countryListDestination(state): CountryListState['countryListDestination'] {
      return isEmpty(state.countryListDestination)
        ? state.countryList
        : state.countryListDestination
    },
    originSlugMap(state): CountryListState['originSlugMap'] {
      return isEmpty(state.originSlugMap) ? state.slugMap : state.originSlugMap
    },
    destinationSlugMap(state): CountryListState['destinationSlugMap'] {
      return isEmpty(state.destinationSlugMap)
        ? state.slugMap
        : state.destinationSlugMap
    },
    countryCodes(_state, getters): string[] {
      return Object.keys(getters['countryListOrigin'])
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    originByContinent(_state, getters, rootState: any) {
      return groupCountriesByContinents(
        rootState.countryToContinentMap,
        getters['countryListOrigin'],
      )
    },
  },
  mutations: {
    setCountryList(state: CountryListState, list: CountryList) {
      state.countryList = list
    },
    setCountryListOrigin(state: CountryListState, list: CountryList) {
      state.countryListOrigin = list
    },
    setCountryListDestination(state: CountryListState, list: CountryList) {
      state.countryListDestination = list
    },
    setSlugMap(state: CountryListState, list: CountryList) {
      state.slugMap = list
    },
    setOriginSlugMap(state: CountryListState, list: CountryList) {
      state.originSlugMap = list
    },
    setDestinationSlugMap(state: CountryListState, list: CountryList) {
      state.destinationSlugMap = list
    },
  },
} as Module<CountryListState, never>

function getFirstLabel(label: string | string[]): string {
  if (Array.isArray(label)) {
    ;[label] = label
  }

  return label
}

export function convertCountryNameToSlug(countryName: string): string {
  return kebabCase(countryName)
}

export function convertCountryListResponseToCountryLabelMap(
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

function convertCountryLabelToSlug(countryName: string): string {
  countryName = kebabCase(countryName.toLowerCase())
  return countryName
}

function groupCountriesByContinents(
  continentList: string,
  countryList: Record<string, string>,
): Record<string, Array<{ value: string; label: string }>> {
  const { t } = useVueI18n()

  let output = Object.entries<string>(continentList).reduce<
    Record<string, Array<{ value: string; label: string }>>
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

  output = transformKeys(output, (continentID) =>
    t(`misc.continents.${continentID}`),
  )

  output = mapValues(output, (countryList) =>
    countryList.sort((a, b) => a.label.localeCompare(b.label)),
  )

  return output
}
