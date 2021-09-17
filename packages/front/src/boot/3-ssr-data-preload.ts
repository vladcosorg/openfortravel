import { boot } from 'quasar/wrappers'

import '@/shared/src/modules/country-list/country-list-node-preload'
import { serverCache } from '@/front/src/misc/server-cache'
import { getI18nInstance } from '@/shared/src/composables/use-plugins'

export default boot(({ store }) => {
  const locale = getI18nInstance().locale.value

  store.commit('setAvailableLocales', serverCache.availableLocales)
  store.commit('setCountryToContinentMap', serverCache.continentMap)
  store.commit('setLabeledLocales', serverCache.labeledLocales)
  store.commit(
    'setLocalizedLanguages',
    serverCache.languages[locale] ?? serverCache.languages['en'],
  )
  if (locale === 'ru') {
    store.commit(
      'modules/countryList/setCountryListNominative',
      serverCache.getCountryCodeToLabelMap(locale).nominative,
    )
    store.commit(
      'modules/countryList/setCountryListOrigin',
      serverCache.getCountryCodeToLabelMap(locale).origin,
    )
    store.commit(
      'modules/countryList/setCountryListDestination',
      serverCache.getCountryCodeToLabelMap(locale).destination,
    )

    store.commit(
      'modules/countryList/setOriginSlugMap',
      serverCache.getCountrySlugToCodeMap('en').origin,
    )
    store.commit(
      'modules/countryList/setDestinationSlugMap',
      serverCache.getCountrySlugToCodeMap('en').destination,
    )
  } else {
    store.commit(
      'modules/countryList/setCountryList',
      serverCache.getCountryCodeToLabelMap(locale).origin,
    )
    store.commit(
      'modules/countryList/setSlugMap',
      serverCache.getCountrySlugToCodeMap('en').origin,
    )
  }

  const nationalities = serverCache.nationalities[locale]
  if (nationalities) {
    store.commit(
      'modules/nationalities/setNationalities',
      serverCache.nationalities[locale],
    )
  }

  // store.commit('setHostRules', serverCache.destinations)
  // console.log(ssrContext)
})
