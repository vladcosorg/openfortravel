import { LocaleMessages } from 'vue-i18n'

import { CountryListTypes } from '@/shared/src/modules/country-list/country-list-store'
import { LocaleList } from '@/shared/src/modules/language/locales'
import { PreloadedNationalityList } from '@/shared/src/modules/nationality/nationality-preload'

class ServerCache {
  public i18nMessages!: LocaleMessages
  public localizedRoutes!: Record<string, Record<string, string>>
  public availableLocales!: LocaleList
  public countryCodeToLabelMap!: Record<string, CountryListTypes>
  public countrySlugToCodeMap!: Record<string, CountryListTypes>
  public countryCodeToSlugMap!: Record<string, CountryListTypes>
  public continentMap!: Record<string, string>
  public nationalities!: PreloadedNationalityList

  public translateOriginSlug(
    currentSlug: string,
    currentLocale: string,
    targetLocale: string,
  ) {
    const countryCode = this.getCountryCodeByOriginSlug(
      currentSlug,
      currentLocale,
    )
    return this.getOriginSlugByCountryCode(countryCode, targetLocale)
  }

  public translateDestinationSlug(
    currentSlug: string,
    currentLocale: string,
    targetLocale: string,
  ) {
    const countryCode = this.getCountryCodeByDestinationSlug(
      currentSlug,
      currentLocale,
    )
    return this.getDestinationSlugByCountryCode(countryCode, targetLocale)
  }

  protected getCountryCodeByOriginSlug(
    originSlug: string,
    locale: string,
  ): string {
    return this.countrySlugToCodeMap[locale]['origin'][originSlug]
  }

  protected getCountryCodeByDestinationSlug(
    originSlug: string,
    locale: string,
  ): string {
    return this.countrySlugToCodeMap[locale]['destination'][originSlug]
  }

  protected getOriginSlugByCountryCode(
    countryCode: string,
    locale: string,
  ): string {
    return this.countryCodeToSlugMap[locale]['origin'][countryCode]
  }

  protected getDestinationSlugByCountryCode(
    countryCode: string,
    locale: string,
  ): string {
    return this.countryCodeToSlugMap[locale]['destination'][countryCode]
  }
}

export const serverCache = new ServerCache()
