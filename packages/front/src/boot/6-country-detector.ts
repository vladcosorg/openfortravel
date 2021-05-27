import { boot } from 'quasar/wrappers'

import { getCookieCountry } from '@/front/src/misc/country-decider'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { transformOriginSlugToCode } from '@/shared/src/modules/country-list/country-list-helpers'

export default boot(({ router, urlPath, ssrContext }) => {
  const rootStore = useRootStore()
  if (!ssrContext) {
    router.afterEach((to) => {
      if (!to.params.originSlug) {
        return
      }

      rootStore.mutations.setVisitorOrigin(
        transformOriginSlugToCode(to.params.originSlug),
      )
    })
    return
  }

  const persistedOrigin = getCookieCountry()
  if (persistedOrigin) {
    rootStore.mutations.setVisitorOrigin(persistedOrigin)
  }

  if (urlPath === '/') {
    if (persistedOrigin) {
      rootStore.mutations.setVisitorOrigin(persistedOrigin)
    } else {
      let countryCode = (ssrContext.req.headers['cf-ipcountry'] ??
        ssrContext.req.headers['x-appengine-country'] ??
        'us') as string
      countryCode = countryCode.toLowerCase()
      rootStore.mutations.setVisitorOrigin(countryCode)
    }
  } else {
    const route = router.resolve(urlPath).route
    const originSlug = route.params.originSlug
    if (route.params.originSlug) {
      rootStore.mutations.setVisitorOrigin(
        transformOriginSlugToCode(originSlug),
      )
    } else {
      if (!persistedOrigin) {
        rootStore.mutations.setVisitorOrigin('us')
      }
    }
  }
})
