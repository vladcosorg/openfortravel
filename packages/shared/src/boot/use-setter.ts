import type { Request } from 'express'
import { boot } from 'quasar/wrappers'

import type { useSharedCache } from '@/shared/src/composables/use-plugins'
import {
  initCookies,
  setRouter,
  setSharedCache,
  setSSRContext,
  setStore,
} from '@/shared/src/composables/use-plugins'

export default boot(({ store, router, ssrContext }) => {
  setRouter(router)
  setStore(store)
  setSSRContext(ssrContext)
  initCookies(ssrContext)

  if (ssrContext) {
    setSharedCache(
      (
        ssrContext.req as Request & {
          sharedCache: ReturnType<typeof useSharedCache>
        }
      ).sharedCache,
    )
  }
})
