import { Router } from 'vue-router'

import { serverCache } from '@/front/src/misc/server-cache'
import { getDestinationRouteURL } from '@/front/src/router/route-builders/destination'
import { getOriginRouteURL } from '@/front/src/router/route-builders/origin'

export default ({
  router,
  redirect,
}: {
  router: Router
  redirect: (url: string, code: number) => void
}) => {
  router.beforeEach((to, _from, next) => {
    if (to.name === 'origin-old') {
      return redirect(
        getOriginRouteURL({
          originSlug:
            serverCache.countrySlugToCodeMap[to.params.locale as string].origin[
              to.params.originSlug as string
            ],
        }),
        301,
      )
    }

    if (to.name === 'destination-old') {
      return redirect(
        getDestinationRouteURL({
          originSlug:
            serverCache.countrySlugToCodeMap[to.params.locale as string].origin[
              to.params.originSlug as string
            ],
          destinationSlug:
            serverCache.countrySlugToCodeMap[to.params.locale as string]
              .destination[to.params.destinationSlug as string],
        }),
        301,
      )
    }
    if (to.name === 'index-targeted') {
      return redirect(
        getDestinationRouteURL({
          originSlug:
            serverCache.countrySlugToCodeMap[to.params.locale as string].origin[
              to.params.originSlug as string
            ],
          destinationSlug:
            serverCache.countrySlugToCodeMap[to.params.locale as string]
              .destination[to.params.destinationSlug as string],
        }),
        301,
      )
    }
    next()
    return
  })
}
