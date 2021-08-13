import { boot } from 'quasar/wrappers'

import {
  initCookies,
  setRouter,
  setSSRContext,
  setStore,
} from '@/shared/src/composables/use-plugins'

export default boot(({ store, router, ssrContext }) => {
  setRouter(router)
  setStore(store)
  setSSRContext(ssrContext)
  initCookies(ssrContext)
  //
  // if (ssrContext) {
  //   setSharedCache(
  //     (
  //       ssrContext.req as Request & {
  //         sharedCache: ReturnType<typeof useSharedCache>
  //       }
  //     ).sharedCache,
  //   )
  // }
})
