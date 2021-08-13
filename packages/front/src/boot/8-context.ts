import { useRootStore } from '@/shared/src/composables/use-plugins'
import { boot } from 'quasar/wrappers'

import { loadContextFromCookie } from '@/front/src/modules/visitor-context/cookies'

export default boot(({ router }) => {
  router.beforeEach((to, _from, next) => {
    if (to.name !== 'origin' && to.name !== 'destination') {
      const context = loadContextFromCookie()
      if (context) {
        useRootStore().mutations.mergeVisitorContext({
          context,
          persistLocally: false,
        })
      }
    }

    next()
    return
  })
})
