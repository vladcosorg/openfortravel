import transform from 'lodash/transform'

import { useStore } from 'src/composables/use-plugins'

export type CountryList = Record<string, string>

function getFirstLabel(label: string | string[]): string {
  if (Array.isArray(label)) {
    ;[label] = label
  }

  return label
}

const fetchCountryList = async (locale: string): Promise<CountryList> => {
  locale = locale.split('-')[0]

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  let translations = await import(
    /* webpackChunkName: "country-list-[request]" */ `i18n-iso-countries/langs/${locale}.json`
  )
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  translations = translations.default.countries as CountryList
  translations = transform(
    translations,
    (list: CountryList, label: string | string[], code: string) => {
      list[code.toLowerCase()] = getFirstLabel(label)
    },
  )
  return translations as CountryList
}

export async function loadCountryList(locale: string): Promise<void> {
  const store = useStore()
  const list = await fetchCountryList(locale)
  store.commit('setCountryList', Object.freeze(list))
}

export function getCountryCodes(): string[] {
  const store = useStore()
  return Object.keys(store.state.countryList)
}

export function getLabelForCountryCode(countryCode: string): string {
  return getFirstLabel(useStore().state.countryList[countryCode])
}
