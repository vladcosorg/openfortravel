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
    if (['admin-index', 'admin-country'].includes(<string>to.name)) {
      await changeLanguage('en')
      return next()
    }

    if (!to.params.locale) {
      let locale: string = cookies.get('locale')
      if (!locale) {
        locale = isServer(ssrContext) ? ssrContext.req
            .acceptsLanguages()[0]
            .toLowerCase()
            .split('-')[0] : navigator.language.toLowerCase().split('-')[0];
        cookies.set('locale', locale)
      }

      return next({ name: 'index', params: { locale } })
    }

    await changeLanguage(to.params.locale)
    return next()
  })
})
