import {
  computed,
  ComputedRef,
  onServerPrefetch,
  toRef,
  watch,
} from '@vue/composition-api'

import { i18n } from 'boot/i18n'
import { transform } from 'lodash'
import { useStore } from 'src/composables/use-plugins'

export type I18nCountryList = Record<string, string>

function getFirstLabel(label: string | string[]): string {
  if (Array.isArray(label)) {
    ;[label] = label
  }

  return label
}

export const fetchCountryList = async (
  locale: string,
): Promise<I18nCountryList> => {
  locale = locale.split('-')[0]

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  let translations = await import(`i18n-iso-countries/langs/${locale}.json`)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  translations = translations.default.countries as I18nCountryList
  translations = transform(
    translations,
    (list: I18nCountryList, label: string | string[], code: string) => {
      list[code.toLowerCase()] = getFirstLabel(label)
    },
  )
  return translations as I18nCountryList
}

async function loadCountryList(locale: string) {
  const store = useStore()
  const list = await fetchCountryList(locale)
  store.commit('setCountryList', Object.freeze(list))
}

export function useCountryList(): ComputedRef<
  { value: string; label: string }[]
> {
  const store = useStore()

  return computed(() => {
    const list = store.state.countryList
    return Object.keys(list).map((key) => ({
      value: key.toLowerCase(),
      label: getFirstLabel(list[key]),
    }))
  })
}

export function getCountryMap(): Record<string, string> {
  const store = useStore()
  return store.state.countryList
}

export function getCountryCodes(): string[] {
  const store = useStore()
  return Object.keys(store.state.countryList)
}

export function getCountryList(): { value: string; label: string }[] {
  const store = useStore()
  const list = store.state.countryList
  return Object.keys(list).map((key) => ({
    value: key.toLowerCase(),
    label: getFirstLabel(list[key]),
  }))
}

export function useCountryListLoader(): void {
  onServerPrefetch(() => loadCountryList(i18n.locale))
  watch(toRef(i18n, 'locale'), loadCountryList)
}

export function getLabelForCountryCode(countryCode: string): string {
  return getFirstLabel(useStore().state.countryList[countryCode])
}

export function getFlagForCountryCode(countryCode: string): string {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(`svg-country-flags/svg/${countryCode}.svg`) as string
}
