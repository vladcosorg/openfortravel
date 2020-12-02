import { boot } from 'quasar/wrappers'

export default boot(({ router }) => {
  router.beforeEach(async (to, from, next) => {
    const decodedURI = decodeURI(to.path)
    if (decodedURI !== to.path) {
      return next(decodedURI)
    }
    return next()
  })
})
