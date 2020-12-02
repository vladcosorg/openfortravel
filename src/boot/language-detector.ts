import { boot } from 'quasar/wrappers'

import { changeLanguage } from 'src/boot/i18n'
import { reloadRoutes } from 'src/router'

export default boot(({ ssrContext, router }) => {
  if (!ssrContext) {
    let isLocalized = false
    router.beforeEach(async (to, from, next) => {
      if (from.params.locale && to.params.locale != from.params.locale) {
        if (!isLocalized) {
          await changeLanguage(to.params.locale)
          reloadRoutes(router, ssrContext)

          if (to.name) {
            const resolved = router.resolve({ name: to.name }, to)
            // debugger
            isLocalized = true
            return next({ path: resolved.href, replace: true })
          }
        } else {
          next()
          isLocalized = false
          return
        }
      }
      next()
    })
  }
})
