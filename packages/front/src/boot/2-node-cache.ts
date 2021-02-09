import { boot } from 'quasar/wrappers'
import VueI18n from 'vue-i18n'

import messages from '@/shared/src/i18n/index.js'
import { loadContinentMap } from '@/shared/src/modules/continent-map/ssr-loader'
import {
  generateCountryCodeToLabelList,
  generateCountryCodeToSlugList,
  generateCountrySlugToCodeList,
} from '@/shared/src/modules/country-list/country-list-node-preload'
import { getTranslatedOrTranslatableLocales } from '@/shared/src/modules/language/locales'

import LocaleMessages = VueI18n.LocaleMessages

import { pregenerateLocalizableRouter } from '@/front/src/router/route-preloader'
import { serverCache } from '@/front/src/misc/server-cache'
import { preloadNationalities } from '@/shared/src/modules/nationality/nationality-preload'

if (!process.env.SERVER) {
  throw new Error('The node-cache should not run on client!')
}

const promises: Promise<unknown>[] = []

serverCache.availableLocales = getTranslatedOrTranslatableLocales()
serverCache.continentMap = loadContinentMap()
serverCache.availableLocales = getTranslatedOrTranslatableLocales()
serverCache.i18nMessages = (messages as unknown) as LocaleMessages
serverCache.localizedRoutes = pregenerateLocalizableRouter()
serverCache.nationalities = preloadNationalities()

promises.push(
  generateCountryCodeToLabelList(serverCache.availableLocales).then(
    (map) => (serverCache.countryCodeToLabelMap = map),
  ),
  generateCountrySlugToCodeList(serverCache.availableLocales).then(
    (map) => (serverCache.countrySlugToCodeMap = map),
  ),
  generateCountryCodeToSlugList(serverCache.availableLocales).then(
    (map) => (serverCache.countryCodeToSlugMap = map),
  ),
)

export default boot(async () => {
  await Promise.all(promises)
})
