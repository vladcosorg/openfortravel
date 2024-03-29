import { MappedPlainDestinationCollection } from '@/shared/src/api/destinations/plain-destination'
import type { CountryListTypes } from '@/shared/src/modules/country-list/country-list-store'
import type { LocaleList } from '@/shared/src/modules/language/locales'
import type { PrefetchedLocalizedLanguages } from '@/shared/src/modules/language/ssr-loaders'
import type { PreloadedNationalityList } from '@/shared/src/modules/nationality/nationality-preload'

import type { VueI18n } from 'vue-i18n'

class ServerCache {
  public i18nMessages!: VueI18n['messages']
  public availableLocales!: LocaleList
  public labeledLocales!: Array<Record<string, string>>
  public countryCodeToLabelMap!: Record<string, CountryListTypes>
  public countrySlugToCodeMap!: Record<string, CountryListTypes>
  public countryCodeToSlugMap!: Record<string, CountryListTypes>
  public continentMap!: Record<string, string>
  public languages!: PrefetchedLocalizedLanguages
  public nationalities!: PreloadedNationalityList
  public quasarLocales!: Record<string, string>
  public destinations?: MappedPlainDestinationCollection

  public getCountryCodeToLabelMap(locale: string): CountryListTypes {
    return (
      this.countryCodeToLabelMap[locale] ?? this.countryCodeToLabelMap['en']
    )
  }

  public getCountrySlugToCodeMap(locale: string): CountryListTypes {
    return this.countrySlugToCodeMap[locale] ?? this.countrySlugToCodeMap['en']
  }

  public getCountryCodeToSlugMap(locale: string): CountryListTypes {
    return this.countryCodeToSlugMap[locale] ?? this.countryCodeToSlugMap['en']
  }

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
    return this.getCountrySlugToCodeMap(locale)['origin'][originSlug]
  }

  protected getCountryCodeByDestinationSlug(
    originSlug: string,
    locale: string,
  ): string {
    return this.getCountrySlugToCodeMap(locale)['destination'][originSlug]
  }

  protected getOriginSlugByCountryCode(
    countryCode: string,
    locale: string,
  ): string {
    return this.getCountryCodeToSlugMap(locale)['origin'][countryCode]
  }

  protected getDestinationSlugByCountryCode(
    countryCode: string,
    locale: string,
  ): string {
    return this.getCountryCodeToSlugMap(locale)['destination'][countryCode]
  }
}

export const serverCache = new ServerCache()
