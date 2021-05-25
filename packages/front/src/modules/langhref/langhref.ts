import { serverCache } from '@/front/src/misc/server-cache'
import {
  resolveRoute,
  routesThatNeedLocalization,
} from '@/front/src/router/route-preloader'
import { useRouter } from '@/shared/src/composables/use-plugins'
import { transformOriginSlugToCode } from '@/shared/src/modules/country-list/country-list-helpers'

type HreflangList = Record<
  string,
  { href: string; rel: string; hreflang: string }
>
export async function generateHreflangTags(): Promise<HreflangList> {
  const currentRoute = useRouter().currentRoute
  const list: HreflangList = {}

  if (
    !currentRoute.name ||
    !routesThatNeedLocalization.includes(currentRoute.name)
  ) {
    return list
  }

  for (const locale of serverCache.availableLocales) {
    const item = {
      href: 'https://openfortravel.org',
      rel: 'alternate',
      hreflang: `${locale}`,
    }

    const localizedParams = { ...currentRoute.params }
    for (const [paramName, paramValue] of Object.entries(localizedParams)) {
      switch (paramName) {
        case 'originSlug':
          localizedParams[paramName] = serverCache.translateOriginSlug(
            paramValue,
            currentRoute.params.locale,
            locale,
          )
          break

        case 'destinationSlug':
          localizedParams[paramName] = serverCache.translateDestinationSlug(
            paramValue,
            currentRoute.params.locale,
            locale,
          )
          break

        case 'locale':
          localizedParams[paramName] = locale
          break
      }
    }

    item.href += resolveRoute(currentRoute.name, locale, localizedParams)

    if (currentRoute.params.originSlug) {
      item.hreflang += `-${transformOriginSlugToCode(
        currentRoute.params.originSlug,
      )}`
    }

    list[locale] = item

    if (locale === 'en') {
      list['default'] = { ...item, hreflang: 'x-default' }
    }
  }
  return list
}
