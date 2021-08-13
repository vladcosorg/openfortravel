import langs from 'iso-language-list/dist/generated/top10-speakers-then-az-value-label.json'
import { boot } from 'quasar/wrappers'

import { serverCache } from '@/front/src/misc/server-cache'
import { pregenerateLocalizableRouter } from '@/front/src/router/route-preloader'
import { listenToMappedOrigins } from '@/shared/src/api/destinations/repository'
import messages from '@/shared/src/i18n/index'
import { loadContinentMap } from '@/shared/src/modules/continent-map/ssr-loader'
import {
  generateCountryCodeToSlugList,
  generateCountrySlugToCodeList,
  preloadCountryList,
} from '@/shared/src/modules/country-list/country-list-node-preload'
import { getTranslatedOrTranslatableLocales } from '@/shared/src/modules/language/locales'
import { loadLanguages } from '@/shared/src/modules/language/ssr-loaders'
import { preloadNationalities } from '@/shared/src/modules/nationality/nationality-preload'

if (!process.env.SERVER) {
  throw new Error('The node-cache should not run on client!')
}

const promises: Array<Promise<unknown>> = [
  listenToMappedOrigins((collection) => {
    serverCache.destinations = collection
  }),
]

serverCache.availableLocales = getTranslatedOrTranslatableLocales()
serverCache.labeledLocales = langs.filter((langPair) =>
  serverCache.availableLocales.includes(langPair.value),
)
serverCache.continentMap = loadContinentMap()
serverCache.languages = loadLanguages()
serverCache.i18nMessages = messages
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
