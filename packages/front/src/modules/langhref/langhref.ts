import { mapValues } from 'lodash'

import { serverCache } from '@/front/src/misc/server-cache'
import {
  resolveRoute,
  routesThatNeedLocalization,
} from '@/front/src/router/route-preloader'
import { useRouter } from '@/shared/src/composables/use-plugins'
import { transformOriginSlugToCode } from '@/shared/src/modules/country-list/country-list-helpers'
import {
  CountryCode,
  CountrySlug,
  CountrySlugType,
  DestinationSlug,
  OriginSlug,
} from '@/shared/src/modules/country-list/country-list-types'
import { Locale } from '@/shared/src/modules/language/locales'

type LocalizedSlugList = Record<Locale, CountrySlug>

async function getAllI18nSlugs(
  countryCode: CountryCode,
  type: CountrySlugType,
): Promise<LocalizedSlugList> {
  return mapValues(
    serverCache.countryCodeToSlugMap,
    (item) => item[type][countryCode],
  )
}

const originSlugCache: Record<string, LocalizedSlugList> = {}
async function getLocalizedOriginSlug(
  originSlug: OriginSlug,
  sourceLocale: string,
  targetLocale: string,
) {
  if (!originSlugCache[originSlug]) {
    const originCode =
      serverCache.countrySlugToCodeMap[sourceLocale][CountrySlugType.ORIGIN][
        originSlug
      ]
    originSlugCache[originSlug] = await getAllI18nSlugs(
      originCode,
      CountrySlugType.ORIGIN,
    )
  }
  return originSlugCache[originSlug][targetLocale]
}

const destinationSlugCache: Record<string, LocalizedSlugList> = {}

async function getLocalizedDestinationSlug(
  destinationSlug: DestinationSlug,
  sourceLocale: string,
  targetLocale: string,
) {
  if (!destinationSlugCache[destinationSlug]) {
    const destinationCode =
      serverCache.countrySlugToCodeMap[sourceLocale][CountrySlugType.ORIGIN][
        destinationSlug
      ]
    destinationSlugCache[destinationSlug] = await getAllI18nSlugs(
      destinationCode,
      CountrySlugType.DESTINATION,
    )
  }
  return destinationSlugCache[destinationSlug][targetLocale]
}

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
          localizedParams[paramName] = await getLocalizedOriginSlug(
            paramValue,
            currentRoute.params.locale,
            locale,
          )
          break

        case 'destinationSlug':
          localizedParams[paramName] = await getLocalizedDestinationSlug(
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
