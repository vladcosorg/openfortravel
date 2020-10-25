import { QSsrContext } from '@quasar/app'
import { boot } from 'quasar/wrappers'

import { changeLanguage } from 'src/boot/i18n'
import { getCookiesAPI } from 'src/misc/misc'

function isServer(ssrContext?: QSsrContext | null): ssrContext is QSsrContext {
  return !!process.env.SERVER && ssrContext !== null && ssrContext !== undefined
}
export default boot(({ ssrContext, router }) => {
  router.beforeEach(async (to, from, next) => {
    const cookies = getCookiesAPI(ssrContext)
    if (['admin-index', 'admin-country'].indexOf(<string>to.name) !== -1) {
      await changeLanguage('en')
      return next()
    }

    if (!to.params.locale) {
      let locale: string = cookies.get('locale')
      if (!locale) {
        if (isServer(ssrContext)) {
          locale = ssrContext.req
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
