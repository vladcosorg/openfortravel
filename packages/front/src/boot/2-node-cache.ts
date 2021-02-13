import langs from 'iso-language-list/dist/generated/top10-speakers-then-az-value-label.json'
import { boot } from 'quasar/wrappers'
import VueI18n from 'vue-i18n'

import { serverCache } from '@/front/src/misc/server-cache'
import { pregenerateLocalizableRouter } from '@/front/src/router/route-preloader'
import messages from '@/shared/src/i18n/index.js'
import { loadContinentMap } from '@/shared/src/modules/continent-map/ssr-loader'
import {
  generateCountryCodeToSlugList,
  generateCountrySlugToCodeList,
  preloadCountryList,
} from '@/shared/src/modules/country-list/country-list-node-preload'
import { getTranslatedOrTranslatableLocales } from '@/shared/src/modules/language/locales'
import { preloadNationalities } from '@/shared/src/modules/nationality/nationality-preload'

import LocaleMessages = VueI18n.LocaleMessages

if (!process.env.SERVER) {
  throw new Error('The node-cache should not run on client!')
}

const promises: Promise<unknown>[] = []

serverCache.availableLocales = getTranslatedOrTranslatableLocales()
serverCache.labeledLocales = langs.filter((langPair) =>
  serverCache.availableLocales.includes(langPair.value),
)
serverCache.continentMap = loadContinentMap()
serverCache.i18nMessages = (messages as unknown) as LocaleMessages
serverCache.localizedRoutes = pregenerateLocalizableRouter()
serverCache.nationalities = preloadNationalities()
serverCache.countryCodeToLabelMap = preloadCountryList()
serverCache.countrySlugToCodeMap = generateCountrySlugToCodeList(
  serverCache.countryCodeToLabelMap,
)
serverCache.countryCodeToSlugMap = generateCountryCodeToSlugList(
  serverCache.countryCodeToLabelMap,
)

export default boot(async () => {
  await Promise.all(promises)
})
