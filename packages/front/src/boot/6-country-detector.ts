import { boot } from 'quasar/wrappers'

import { getCookieCountry } from '@/front/src/misc/country-decider'
import { transformOriginSlugToCode } from '@/shared/src/modules/country-list/country-list-helpers'

export default boot(async ({ router, urlPath, store, ssrContext }) => {
  if (!ssrContext) {
    return
  }

  const persistedOrigin = getCookieCountry()
  if (persistedOrigin) {
    store.commit('setDetectedCountry', persistedOrigin)
  }

  store.commit('setDetectedCountry', persistedOrigin)
  if (urlPath === '/') {
    if (persistedOrigin) {
      store.commit('setDetectedCountry', persistedOrigin)
    } else {
      let countryCode = (ssrContext.req.headers['cf-ipcountry'] ??
        ssrContext.req.headers['x-appengine-country'] ??
        'us') as string
      countryCode = countryCode.toLowerCase()

      store.commit('setDetectedCountry', countryCode, true)
    }
  } else {
    const route = router.resolve(urlPath).route
    const originSlug = route.params.originSlug
    if (route.params.originSlug) {
      store.commit(
        'setDetectedCountry',
        transformOriginSlugToCode(originSlug),
        true,
      )
    } else {
      if (!persistedOrigin) {
        store.commit('setDetectedCountry', 'us', true)
      }
    }
  }
})
