import {
  getI18nInstance,
  useVueI18n,
} from '@/shared/src/composables/use-plugins'
import {
  getDestinationLabelForCountryCode,
  getOriginLabelForCountryCode,
} from '@/shared/src/modules/country-list/country-list-helpers'

export function tl(id: string, values: Record<string, string> = {}): string {
  const { t } = useVueI18n()
  return replacePlaceholders(t(id), values)
}

export function tr(id: string, values: Record<string, string> = {}) {
  const i18n = getI18nInstance()

  const allMessages: string[] = i18n.tm(id)
  const max = allMessages.length
  const seedArr = Object.values(values).map((value) => stringHashCode(value))
  const seed = seedArr.reduce((a, b) => Math.abs(a + b), 0)
  const index = seededRandom(max, seed)

  return replacePlaceholders(allMessages[index], values)
}

function replacePlaceholders(
  input: string,
  placeholders: Record<string, string>,
): string {
  for (let [key, value] of Object.entries(placeholders)) {
    if (key === 'origin') {
      value = getOriginLabelForCountryCode(value)
    }

    if (key === 'destination') {
      value = getDestinationLabelForCountryCode(value)
    }

    input = input.replace(
      new RegExp(`<\\s*?i\\s*?id="${key}"\\s*?>(.*?)<\\s*?/\\s*?i\\s*?>`),
      key === 'link' ? `<a href="${value}">$1</a>` : value,
    )
  }

  return input
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
