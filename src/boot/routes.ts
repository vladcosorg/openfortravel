import { boot } from 'quasar/wrappers'
import routes from 'src/router/routes'
// import { i18n } from 'boot/i18n'
// import { Quasar } from 'quasar'
export default boot(({ ssrContext, router }) => {
  // console.log(ssrContext.req.acceptsLanguages()[0].toLowerCase())
  // router.beforeEach((to, from, next) => {
  //   i18n.locale = to.params.locale
  //   // console.log(from)
  //   // console.log(to)
  //
  //   if (!to.params.locale) {
  //     return next({ name: 'index', params: { locale: 'ru' } })
  //   }
  //
  //   // eslint-disable-next-line no-void
  //   void import(
  //     /* webpackInclude: /(ro|de|ru|en-us)\.js$/ */
  //     'quasar/lang/' + i18n.locale
  //   ).then(translations => {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  //     Quasar.lang.set(translations.default, ssrContext)
  //   })
  //
  //   return next()
  // })
  router.addRoutes(routes())
})
