import difference from 'lodash/difference'
import intersection from 'lodash/intersection'

import { useVueI18n } from '@/shared/src/composables/use-plugins'

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

export function generateCountryAndAreaSequence(
  countryAndAreaCodes: string[],
  codeLabels: Record<string, string>,
  {
    truncate = true,
    compact = true,
  }: {
    truncate?: boolean | number
    compact?: boolean
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
    return `<b>${labelledList.pop()}</b>` as string
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

function mapCodesToLabels(
  countryAndAreaCodes: string[],
  codeLabels: Record<string, string>,
): string[] {
  return countryAndAreaCodes.map((code) => codeLabels[code] ?? code)
}
