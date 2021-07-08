import omit from 'lodash/omit'
import { boot } from 'quasar/wrappers'

import { loadContextFromCookie } from '@/front/src/modules/visitor-context/cookies'
import { getContextBySearchId } from '@/shared/src/api/searchIds/repository'
import { useRootStore } from '@/shared/src/composables/use-plugins'

export default boot(({ router, redirect }) => {
  router.beforeEach(async (to, _from, next) => {
    if (!to.params.searchId) {
      const context = loadContextFromCookie()

      if (context) {
        useRootStore().mutations.mergeVisitorContext({
          context,
          persistLocally: false,
        })
      }

      next()
      return
    }

    const searchId = to.params.searchId
    let persistLocally = false
    useRootStore().mutations.setSearchId(searchId)

    let context = loadContextFromCookie(searchId)

    if (!context) {
      try {
        context = await getContextBySearchId(searchId)
      } catch {
        redirect(
          router.resolve({
            name: to.name as string,
            params: omit(to.params, ['searchId']),
          }).href,
        )

        return
      }

      persistLocally = true
    }

    useRootStore().mutations.mergeVisitorContext({
      context,
      searchId,
      persistLocally,
    })

    next()
  })
})
