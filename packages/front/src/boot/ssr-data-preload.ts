import { boot } from 'quasar/wrappers'

import { loadContinentMap } from '@/shared/src/modules/continent-map/ssr-loader'

export default boot(({ store }) => {
  store.commit('setCountryToContinentMap', loadContinentMap())
})
