import { boot } from 'quasar/wrappers'

import { loadContextFromCookie } from '@/front/src/modules/visitor-context/cookies'
import { useRootStore } from '@/shared/src/composables/use-plugins'

export default boot(() => {
  const persistedContext = loadContextFromCookie()
  if (persistedContext) {
    useRootStore().mutations.setVisitorContext({
      context: persistedContext,
      persist: false,
    })
  }
})
