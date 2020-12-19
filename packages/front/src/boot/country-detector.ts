import { boot } from 'quasar/wrappers'

import {
  decideOnCountry,
  persistCountry,
} from '@/front/src/misc/country-decider'
import { getCookiesAPI } from '@/front/src/misc/misc'

export default boot(({ router, ssrContext }) => {
  router.afterEach(async (to) => {
    const cookies = getCookiesAPI(ssrContext)
    const country = await decideOnCountry(to, cookies)
    persistCountry(country)
  })
})
