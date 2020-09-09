import _ from 'lodash'

export const fetchCountryList = async (locale: string): Promise<Record<string, string>> => {
  locale = locale.split('-')[0]
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const translations = await import(
    (`i18n-iso-countries/langs/${locale}.json`)
  )
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  return (translations.default.countries) as Record<string, string>
}

export const fetchCountryListAsPairs = async (locale: string) => {
  const translations = await fetchCountryList(locale)
  const out = Object.keys(translations).map(key => ({
    value: key.toLowerCase(),
    label: translations[key]
  }))

  return Object.freeze(out)
}

export const fetchCountryListAsDict = async (locale: string) => {
  let translations = await fetchCountryList(locale)
  translations = _.transform(translations, function (result, val, key) {
    result[key.toLowerCase()] = val
  })

  return Object.freeze(translations)
}
