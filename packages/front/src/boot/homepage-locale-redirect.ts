import { boot } from 'quasar/wrappers'

import { loadLocale } from '@/front/src/boot/i18n'
import { inferLocaleFromClient } from '@/front/src/misc/locale'

export default boot(async ({ router }) => {
  router.beforeEach(async (to, _from, next) => {
    if (to.path === '/') {
      const locale = inferLocaleFromClient()
      await loadLocale(locale)
      return next({ name: 'index', params: { locale } })
    }

    // if (from.params.locale && to.params.locale !== from.params.locale) {
    //   console.log('eee')
    //   await changeLocale(to.params.locale)
    // }

    next()
  })
})
