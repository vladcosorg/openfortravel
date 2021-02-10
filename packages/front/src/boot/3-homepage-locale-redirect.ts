import { boot } from 'quasar/wrappers'

import { loadLocale } from '@/front/src/boot/5-i18n'
import {
  decideOnCountry,
  getCurrentOriginSlug,
  setCurrentCountry,
} from '@/front/src/misc/country-decider'
import { inferLocaleFromClient } from '@/front/src/misc/locale'

export default boot(async ({ router }) => {
  router.beforeEach(async (to, _from, next) => {
    if (
      to.name &&
      ['index-nolocale-nocountry', 'index-redirect'].includes(to.name)
    ) {
      const locale = inferLocaleFromClient()
      setCurrentCountry(await decideOnCountry(router.currentRoute, false), true)
      await loadLocale(locale)
      return next({
        name: 'index-targeted',
        params: { locale, originSlug: getCurrentOriginSlug() },
      })
    }

    next()
  })
})