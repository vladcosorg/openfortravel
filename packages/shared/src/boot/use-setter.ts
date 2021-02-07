import type { Request } from 'express'
import { boot } from 'quasar/wrappers'

import {
  initCookies,
  setRouter,
  setSharedCache,
  setSSRContext,
  setStore,
  useSharedCache,
} from '@/shared/src/composables/use-plugins'

export default boot(({ store, router, ssrContext }) => {
  setRouter(router)
  setStore(store)
  setSSRContext(ssrContext)
  initCookies(ssrContext)

  if (ssrContext) {
    setSharedCache(
      (ssrContext.req as Request & {
        sharedCache: ReturnType<typeof useSharedCache>
      }).sharedCache,
    )
  }
})
