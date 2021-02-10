import { boot } from 'quasar/wrappers'

import '@/shared/src/modules/country-list/country-list-node-preload'
import { serverCache } from '@/front/src/misc/server-cache'
import { useI18n } from '@/shared/src/composables/use-plugins'

export default boot(({ store }) => {
  store.commit('setAvailableLocales', serverCache.availableLocales)
  store.commit('setCountryToContinentMap', serverCache.continentMap)

  store.commit(
    'modules/countryList/setCanonicalSlugToCountryCodeMap',
    serverCache.countrySlugToCodeMap.en.destination,
  )
  store.commit(
    'modules/countryList/setCountryList',
    serverCache.countryCodeToLabelMap[useI18n().locale].origin,
  )

  store.commit(
    'modules/countryList/setCountryListOrigin',
    serverCache.countryCodeToLabelMap[useI18n().locale].origin,
  )
  store.commit(
    'modules/countryList/setCountryListDestination',
    serverCache.countryCodeToLabelMap[useI18n().locale].destination,
  )
  store.commit(
    'modules/countryList/setOriginSlugMap',
    serverCache.countrySlugToCodeMap[useI18n().locale].origin,
  )
  store.commit(
    'modules/countryList/setDestinationSlugMap',
    serverCache.countrySlugToCodeMap[useI18n().locale].destination,
  )

  const nationalities = serverCache.nationalities[useI18n().locale]
  if (nationalities) {
    store.commit(
      'modules/nationalities/setNationalities',
      serverCache.nationalities[useI18n().locale],
    )
  }
})