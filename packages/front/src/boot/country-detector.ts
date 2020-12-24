import { boot } from 'quasar/wrappers'
import { Route } from 'vue-router'

import {
  decideOnCountry,
  persistCountry,
} from '@/front/src/misc/country-decider'

export default boot(async ({ router }) => {
  if (process.env.SERVER) {
    await detectAndRememberDefaultCountry(router.currentRoute)
  } else {
    router.afterEach(async (to) => {
      await detectAndRememberDefaultCountry(to)
    })
  }
})

export async function detectAndRememberDefaultCountry(
  route: Route,
): Promise<void> {
  persistCountry(await decideOnCountry(route))
}
