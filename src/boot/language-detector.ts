import { boot } from 'quasar/wrappers'
import { Cookies } from 'quasar'
import { i18n } from 'boot/i18n'
export default boot(({ Vue, ssrContext, router }) => {
  router.beforeEach((to, from, next) => {
    const cookies = process.env.SERVER
      ? Cookies.parseSSR(ssrContext)
      : Cookies // otherwise we're on client

    if (!to.params.locale) {
      let locale: string = cookies.get('locale')
      if (!locale) {
        if (process.env.SERVER) {
          locale = ssrContext?.req.acceptsLanguages()[0].toLowerCase()
        } else {
          locale = navigator.language.toLowerCase()
        }
        cookies.set('locale', locale)
      }

      return next({ name: 'index', params: { locale } })
    }

    i18n.locale = to.params.locale

    return next()
  })
})
