import {
  changeLocale,
  getLocaleCookie,
  setLocaleCookie,
} from '@/front/src/boot/i18n'
import { boot } from 'quasar/wrappers'

export default boot(async ({ router, ssrContext }) => {
  router.beforeEach(async (to, from, next) => {
    if (to.path === '/') {
      let locale: string = getLocaleCookie(ssrContext)
      if (!locale) {
        locale = ssrContext
          ? ssrContext.req.acceptsLanguages()[0].toLowerCase().split('-')[0]
          : navigator.language.toLowerCase().split('-')[0]

        setLocaleCookie(locale, ssrContext)
      }

      await changeLocale(locale)
      return next({ name: 'index', params: { locale } })
    }

    if (from.params.locale && to.params.locale !== from.params.locale) {
      await changeLocale(to.params.locale)
    }

    next()
  })
})
