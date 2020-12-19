import { boot } from 'quasar/wrappers'

import {
  initCookies,
  setRouter,
  setStore,
} from '@/shared/src/composables/use-plugins'

export default boot(({ store, router, ssrContext }) => {
  setRouter(router)
  setStore(store)
  initCookies(ssrContext)
})
