import VueRouter from 'vue-router'

import { createGenericRouter } from '@/front/src/router/routes'
import { useI18n, useRouter } from '@/shared/src/composables/use-plugins'
import {
  getTranslatedOrTranslatableLocales,
  Locale,
} from '@/shared/src/misc/locales'
import {
  transformDestinationSlugToCode,
  transformOriginSlugToCode,
} from '@/shared/src/modules/country-list/country-list-helpers'
import {
  convertCountryNameToSlug,
  loadCountryListForLocale,
} from '@/shared/src/modules/country-list/country-list-store'
import {
  CountryCode,
  CountrySlug,
  CountrySlugType,
  DestinationSlug,
  OriginSlug,
} from '@/shared/src/modules/country-list/country-list-types'

type LocalizedSlugList = Record<Locale, CountrySlug>

async function getAllI18nSlugs(
  countryCode: CountryCode,
  type: CountrySlugType,
): Promise<LocalizedSlugList> {
  const output: LocalizedSlugList = {}
  for (const locale of getTranslatedOrTranslatableLocales()) {
    const countryList = await loadCountryListForLocale(locale)
    output[locale] = convertCountryNameToSlug(countryList[type][countryCode])
  }

  return output
}

const originSlugCache: Record<string, LocalizedSlugList> = {}
async function getLocalizedOriginSlug(originSlug: OriginSlug, locale: string) {
  if (!originSlugCache[originSlug]) {
    const originCode = transformOriginSlugToCode(originSlug)

    originSlugCache[originSlug] = await getAllI18nSlugs(
      originCode,
      CountrySlugType.ORIGIN,
    )
  }
  return originSlugCache[originSlug][locale]
}

const destinationSlugCache: Record<string, LocalizedSlugList> = {}
async function getLocalizedDestinationSlug(
  destinationSlug: DestinationSlug,
  locale: string,
) {
  if (!destinationSlugCache[destinationSlug]) {
    const originCode = transformDestinationSlugToCode(destinationSlug)
    destinationSlugCache[destinationSlug] = await getAllI18nSlugs(
      originCode,
      CountrySlugType.DESTINATION,
    )
  }
  return destinationSlugCache[destinationSlug][locale]
}

function getLocalizedRouter(locale: string): VueRouter {
  const i18n = useI18n()
  i18n.locale = locale
  return createGenericRouter(i18n)
}

type HreflangList = Record<
  string,
  { href: string; rel: string; hreflang: string }
>
export async function generateHreflangTags(): Promise<HreflangList> {
  const currentRoute = useRouter().currentRoute
  const list: HreflangList = {}

  for (const locale of getTranslatedOrTranslatableLocales()) {
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
            locale,
          )
          break

        case 'destinationSlug':
          localizedParams[paramName] = await getLocalizedDestinationSlug(
            paramValue,
            locale,
          )
          break

        case 'locale':
          localizedParams[paramName] = locale
          break
      }
    }
    item.href += getLocalizedRouter(locale).resolve(
      {
        name: currentRoute.name as string,
        params: localizedParams,
      },
      currentRoute,
    ).href

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
