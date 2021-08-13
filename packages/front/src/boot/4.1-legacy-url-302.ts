import {
  transformDestinationSlugToCode,
  transformOriginSlugToCode,
} from '@/shared/src/modules/country-list/country-list-helpers'
import { boot } from 'quasar/wrappers'

import { getDestinationRouteURL } from '@/front/src/router/route-builders/destination'
import { getOriginRouteURL } from '@/front/src/router/route-builders/origin'

export default boot(({ router, redirect }) => {
  router.beforeEach((to, _from, next) => {
    if (to.name === 'origin-old') {
      return redirect(
        getOriginRouteURL({
          originSlug: transformOriginSlugToCode(to.params.originSlug),
        }),
        301,
      )
    }

    if (to.name === 'destination-old') {
      return redirect(
        getDestinationRouteURL({
          originSlug: transformOriginSlugToCode(to.params.originSlug),
          destinationSlug: transformDestinationSlugToCode(
            to.params.destinationSlug,
          ),
        }),
        301,
      )
    }
    next()
    return
  })
})
