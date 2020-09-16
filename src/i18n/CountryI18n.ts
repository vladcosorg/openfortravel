export type CountryCode = string
export const fetchCountryList = async (
  locale: string,
): Promise<Record<string, string>> => {
  locale = locale.split('-')[0]
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const translations = await import(`i18n-iso-countries/langs/${locale}.json`)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  return translations.default.countries as Record<string, string>
}
