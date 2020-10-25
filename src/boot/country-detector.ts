import { boot } from 'quasar/wrappers'

import { decideOnCountry, persistCountry } from 'src/misc/CountryDecider'
import { getCookiesAPI } from 'src/misc/misc'

export default boot(({ router, ssrContext }) => {
  router.afterEach(async (to) => {
    const cookies = getCookiesAPI(ssrContext)
    const country = await decideOnCountry(to, cookies)
    persistCountry(country)
  })
})
