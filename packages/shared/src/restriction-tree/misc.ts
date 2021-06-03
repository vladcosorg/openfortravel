import difference from 'lodash/difference'
import intersection from 'lodash/intersection'
import isEqual from 'lodash/isEqual'

import { useVueI18n } from '@/shared/src/composables/use-plugins'
import {
  getLabelForCountryCode,
  getOriginLabels,
  sortList,
} from '@/shared/src/modules/country-list/country-list-helpers'

export const EU = [
  'at',
  'be',
  'bg',
  'hr',
  'cy',
  'cz',
  'dk',
  'ee',
  'fi',
  'fr',
  'de',
  'gr',
  'hu',
  'ie',
  'it',
  'lv',
  'li',
  'lu',
  'mt',
  'nl',
  'pl',
  'pt',
  'ro',
  'sk',
  'si',
  'es',
  'se',
]
export const EEA = [...EU, 'is', 'lt', 'no']
export const SCHENGEN = [
  'at',
  'be',
  'cz',
  'dk',
  'ee',
  'fi',
  'fr',
  'de',
  'gr',
  'hu',
  'is',
  'it',
  'lv',
  'li',
  'lt',
  'lu',
  'mt',
  'nl',
  'no',
  'pl',
  'pt',
  'sk',
  'si',
  'es',
  'se',
  'ch',
]

export function isSchengen(countryCodes: string[]): boolean | string[] {
  if (isEqual(SCHENGEN, countryCodes)) {
    return true
  }

  const diff = intersection(SCHENGEN, countryCodes)

  // const diff = difference(countryCodes, SCHENGEN)
}

export function getAbbrebiationOrCountry(
  countryCodes: string[],
  focusCountry: string,
): string {
  if (difference(SCHENGEN, countryCodes).length === 0) {
    return `<b class="text-accent">Schengen Area</b> (including <b class="text-accent">${getLabelForCountryCode(
      focusCountry,
    )}</b>)`
  }

  return 'aa'
}

function joinSequence(sequence: string[]): string {
  const sequenceLength = sequence.length
  if (sequenceLength === 0) {
    return ''
  }

  if (sequenceLength === 1) {
    return sequence.pop() as string
  }

  const suffix = sequence.pop()

  return (
    sequence
      .map((fragment, index) => {
        if (index == 3) {
          return `<span class="collapser"><span class="placeholder">and 164 other countries (click to show full list)</span><span class="full-list">${fragment},`
        } else if (index === sequenceLength) {
          return `${fragment}</span></span>`
        } else {
          return `${fragment},`
        }
      })
      .join(' ') + ` and ${suffix}`
  )
}

export function formatAsHighlightedSequence(
  countryAndAreaCodes: string[],
  highlightedCountryCode: string,
): string {
  const countryLabels = getOriginLabels()
  const highlightedLabel = countryLabels[highlightedCountryCode]

  if (!highlightedLabel) {
    throw new Error(
      `The highlight code '${highlightedCountryCode}' is not valid`,
    )
  }

  const labelledList = mapCodesToLabels(countryAndAreaCodes, countryLabels)
  const sortedList = sortList(labelledList, [highlightedLabel])
  const highlightedList = sortedList.map((label) =>
    maybeHighlight(label, label === highlightedLabel ? 'text-accent' : true),
  )

  return joinSequence(highlightedList)
}

export function generateCountryAndAreaSequence(
  countryAndAreaCodes: string[],
  codeLabels: Record<string, string>,
  {
    truncate = true,
    compact = true,
    highlightCountries = true,
  }: {
    truncate?: boolean | number
    compact?: boolean
    highlightCountries?: boolean | string[] | string
  } = {},
): string {
  const { t } = useVueI18n()
  if (compact) {
    countryAndAreaCodes = compactList(countryAndAreaCodes)
  }

  let labelledList = mapCodesToLabels(countryAndAreaCodes, codeLabels)

  if (labelledList.length === 0) {
    return ''
  }

  if (labelledList.length === 1) {
    return `<b>${labelledList.pop()}</b>`
  }

  let suffix
  if (truncate) {
    const { truncatedList, overflowCount } = truncateCountryAndAreaSequence(
      labelledList,
      typeof truncate === 'number' ? truncate : undefined,
    )
    if (overflowCount > 0) {
      labelledList = truncatedList
      suffix = t('misc.collapsedSequence', { count: overflowCount })
    }
  }

  if (!suffix) {
    suffix = labelledList.pop()
  }

  return `${labelledList.map((item) => `<b>${item}</b>`).join(', ')} ${t(
    'misc.and',
  )} ${suffix}`
}

function maybeHighlight(fragment: string, highlight: boolean | string): string {
  return highlight === false
    ? fragment
    : typeof highlight === 'string'
    ? `<b class="${highlight}">${fragment}</b>`
    : `<b>${fragment}</b>`
}

function compactList(countryCodes: string[]): string[] {
  const elementsToRemove: string[] = []
  if (intersection(EU, countryCodes).length === EU.length) {
    countryCodes = ['eu', ...countryCodes]
    elementsToRemove.push(...EU)
  }

  if (intersection(SCHENGEN, countryCodes).length === SCHENGEN.length) {
    countryCodes = ['schengen', ...countryCodes]
    elementsToRemove.push(...SCHENGEN)
  }

  if (intersection(EEA, countryCodes).length === EEA.length) {
    countryCodes = ['eea', ...countryCodes]
    elementsToRemove.push(...EEA)
  }

  return difference(countryCodes, elementsToRemove)
}

function truncateCountryAndAreaSequence(
  labelledList: string[],
  softCharLimit = 100,
): { truncatedList: string[]; overflowCount: number } {
  const truncatedList = []
  let charCount = 0
  let overflowCount = 0
  for (const label of labelledList) {
    charCount += label.length

    if (charCount <= softCharLimit) {
      truncatedList.push(label)
    } else {
      overflowCount++
    }
  }
  return {
    truncatedList,
    overflowCount,
  }
}

export function mapCodesToLabels(
  countryAndAreaCodes: string[],
  codeLabels: Record<string, string>,
  highlightCodes: string[] = [],
): string[] {
  return countryAndAreaCodes.map((code) => {
    let label = codeLabels[code] ?? code

    if (highlightCodes.includes(code)) {
      label = `<b>${label}</b>`
    }

    return label
  })
}
