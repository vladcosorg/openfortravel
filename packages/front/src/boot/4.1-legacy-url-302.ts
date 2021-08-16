import { Router } from 'vue-router'

import { serverCache } from '@/front/src/misc/server-cache'
import { getDestinationRouteURL } from '@/front/src/router/route-builders/destination'
import { getOriginRouteURL } from '@/front/src/router/route-builders/origin'
import { useRouter } from '@/shared/src/composables/use-plugins'

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
          originSlug: getCodeByLocalizedOrFallbackSlug(
            to.params.locale,
            to.params.originSlug,
            'origin',
          ),
        }),
        301,
      )
    }

    if (to.name === 'destination-old') {
      return redirect(
        getDestinationRouteURL({
          originSlug: getCodeByLocalizedOrFallbackSlug(
            to.params.locale,
            to.params.originSlug,
            'origin',
          ),
          destinationSlug: getCodeByLocalizedOrFallbackSlug(
            to.params.locale,
            to.params.destinationSlug,
            'destination',
          ),
        }),
        301,
      )
    }
    if (to.name === 'index-targeted-old') {
      return redirect(
        useRouter().resolve({
          name: 'index-targeted',
          params: {
            locale: to.params.locale,
            originSlug:
              serverCache.countryCodeToSlugMap['en'].origin[
                serverCache.countrySlugToCodeMap[to.params.locale as string]
                  .origin[to.params.originSlug as string]
              ],
          },
        }).href,
        301,
      )
    }
    next()
    return
  })
}

function getCodeByLocalizedOrFallbackSlug(
  locale: string,
  slug: string,
  type: 'origin' | 'destination',
): string {
  const localizedList =
    serverCache.countrySlugToCodeMap[locale] ??
    serverCache.countrySlugToCodeMap['en']
  return localizedList[type][slug] ?? 'us'
}
