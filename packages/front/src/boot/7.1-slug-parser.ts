import { boot } from 'quasar/wrappers'

import { parseRoute } from '@/front/src/router/transformers/_helpers'
import { applyContextFromProps } from '@/front/src/composables/visitor-context-applier'
import { originParameterTransformers } from '@/front/src/router/route-builders/origin'
import { destinationParameterTransformers } from '@/front/src/router/route-builders/destination'
import { useRootStore } from '@/shared/src/composables/use-plugins'

export default boot(({ router }) => {
  router.beforeEach((to, _from, next) => {
    if (to.name === 'origin' || to.name === 'destination') {
      const params = parseRoute(
        to.params,
        to.name === 'origin'
          ? originParameterTransformers
          : destinationParameterTransformers,
      )
      useRootStore().mutations.setSlugs(params)
      applyContextFromProps(params)
    }

    next()
  })
})
