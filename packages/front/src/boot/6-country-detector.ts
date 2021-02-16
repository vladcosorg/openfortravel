import { boot } from 'quasar/wrappers'

import { getCookieCountry } from '@/front/src/misc/country-decider'
import { fetchCurrentCountryCode } from '@/shared/src/api/ip-api'
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
      let countryCode: string
      try {
        const remoteIP = ssrContext.req.headers['x-forwarded-for'] as
          | string
          | undefined
        if (!remoteIP) {
          console.error(
            `Ip not detected in headers ${JSON.stringify(
              ssrContext.req.headers,
            )}`,
          )
          throw new Error(
            `Ip not detected in headers ${JSON.stringify(
              ssrContext.req.headers,
            )}`,
          )
        }
        countryCode = await fetchCurrentCountryCode(remoteIP)
      } catch {
        // give up, set the fallback country code
        countryCode = 'us'
      }
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
