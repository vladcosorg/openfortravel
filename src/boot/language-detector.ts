import { boot } from 'quasar/wrappers'
import { changeLanguage } from 'boot/i18n'
import { getCookiesAPI } from 'src/misc/misc'
export default boot(({ Vue, ssrContext, router }) => {
  router.beforeEach(async (to, from, next) => {
    const cookies = getCookiesAPI(ssrContext)
    if (['admin-index', 'admin-country'].indexOf(to.name) !== -1) {
      await changeLanguage('ru')
      return next()
    }

    if (!to.params.locale) {
      let locale: string = cookies.get('locale')
      if (!locale) {
        if (process.env.SERVER) {
          locale = ssrContext?.req
            .acceptsLanguages()[0]
            .toLowerCase()
            .split('-')[0]
        } else {
          locale = navigator.language.toLowerCase().split('-')[0]
        }
        cookies.set('locale', locale)
      }

      return next({ name: 'index', params: { locale } })
    }

    await changeLanguage(to.params.locale)
    return next()
  })
})
