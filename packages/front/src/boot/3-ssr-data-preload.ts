import { boot } from 'quasar/wrappers'

import '@/shared/src/modules/country-list/country-list-node-preload'
import { serverCache } from '@/front/src/misc/server-cache'
import { useI18n } from '@/shared/src/composables/use-plugins'

export default boot(async ({ store }) => {
  store.commit('setAvailableLocales', serverCache.availableLocales)
  store.commit('setCountryToContinentMap', serverCache.continentMap)
  store.commit('setLabeledLocales', serverCache.labeledLocales)
  if (useI18n().locale === 'ru') {
    store.commit(
      'modules/countryList/setCountryListOrigin',
      serverCache.getCountryCodeToLabelMap(useI18n().locale).origin,
    )
    store.commit(
      'modules/countryList/setCountryListDestination',
      serverCache.getCountryCodeToLabelMap(useI18n().locale).destination,
    )

    store.commit(
      'modules/countryList/setOriginSlugMap',
      serverCache.getCountrySlugToCodeMap(useI18n().locale).origin,
    )
    store.commit(
      'modules/countryList/setDestinationSlugMap',
      serverCache.getCountrySlugToCodeMap(useI18n().locale).destination,
    )
  } else {
    store.commit(
      'modules/countryList/setCountryList',
      serverCache.getCountryCodeToLabelMap(useI18n().locale).origin,
    )
    store.commit(
      'modules/countryList/setSlugMap',
      serverCache.getCountrySlugToCodeMap(useI18n().locale).origin,
    )
  }

  const nationalities = serverCache.nationalities[useI18n().locale]
  if (nationalities) {
    store.commit(
      'modules/nationalities/setNationalities',
      serverCache.nationalities[useI18n().locale],
    )
  }

  await store.dispatch('fetchHostRules')
})
