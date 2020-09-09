import { boot } from 'quasar/wrappers'
import routes from 'src/router/routes'
// import { i18n } from 'boot/i18n'
// import { Quasar } from 'quasar'
export default boot(({ ssrContext, router }) => {
  router.addRoutes(routes())
})
