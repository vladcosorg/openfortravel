import { boot } from 'quasar/wrappers'

import '@/shared/src/modules/country-list/country-list-node-preload'
import { serverCache } from '@/front/src/misc/server-cache'
import { useI18n } from '@/shared/src/composables/use-plugins'

export default boot(({ store }) => {
  store.commit('setAvailableLocales', serverCache.availableLocales)
  store.commit('setCountryToContinentMap', serverCache.continentMap)

  const nationalities = serverCache.nationalities[useI18n().locale]
  if (nationalities) {
    store.commit(
      'modules/nationalities/setNationalities',
      serverCache.nationalities[useI18n().locale],
    )
  }
})
