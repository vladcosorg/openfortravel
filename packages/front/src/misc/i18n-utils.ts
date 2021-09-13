import { useI18n } from '@/shared/src/composables/use-plugins'
import {
  getDestinationLabelForCountryCode,
  getOriginLabelForCountryCode,
} from '@/shared/src/modules/country-list/country-list-helpers'

export function tr(id: string, values: Record<string, string> = {}) {
  const i18n = useI18n()

  const allMessages: string[] = i18n.tm(id)
  const max = allMessages.length
  const seedArr = Object.values(values).map((value) => stringHashCode(value))
  const seed = seedArr.reduce((a, b) => Math.abs(a + b), 0)
  const index = seededRandom(max, seed)
  let rawTranslation = allMessages[index]

  for (let [key, value] of Object.entries(values)) {
    if (key === 'origin') {
      value = getOriginLabelForCountryCode(value)
    }

    if (key === 'destination') {
      value = getDestinationLabelForCountryCode(value)
    }

    rawTranslation = rawTranslation.replace(
      new RegExp(`<\\s*?i\\s*?id="${key}"\\s*?>(.*?)<\\s*?/\\s*?i\\s*?>`),
      key === 'link' ? `<a href="${value}">$1</a>` : value,
    )
  }

  return rawTranslation
}

const seededRandom = function (max: number, seed: number) {
  seed = (seed * 9301 + 49_297) % 233_280
  return Math.floor((seed / 233_280) * max)
}
const stringHashCode = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; ++i) {
    hash = Math.imul(31, hash) + str.charCodeAt(i)
  }

  return Math.trunc(hash)
}
