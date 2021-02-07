import { LocaleMessages } from 'vue-i18n'

import { CountryListTypes } from '@/shared/src/modules/country-list/country-list-store'
import { LocaleList } from '@/shared/src/modules/language/locales'
import { PreloadedNationalityList } from '@/shared/src/modules/nationality/nationality-preload'

class ServerCache {
  public i18nMessages!: LocaleMessages
  public localizedRoutes!: Record<string, Record<string, string>>
  public availableLocales!: LocaleList
  public countrySlugMap!: Record<string, CountryListTypes>
  public countryList!: Record<string, CountryListTypes>
  public continentMap!: Record<string, string>
  public nationalities!: PreloadedNationalityList
}

export const serverCache = new ServerCache()
