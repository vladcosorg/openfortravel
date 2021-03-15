// eslint-disable-next-line import/no-unused-modules
import path from 'path'

import { merge, mapValues } from 'lodash'
import { EnumChangefreq, simpleSitemapAndIndex, SitemapItemLoose } from 'sitemap'
import { LocaleMessages } from 'vue-i18n'
import VueRouter, { Location } from 'vue-router'

import { createGenericRouter } from '@/front/src/router/routes'
import messages from '@/shared/src/i18n/index'
import { createVueI18n } from '@/shared/src/misc/i18n'
import { transformKeys } from '@/shared/src/misc/misc'
import { CountryList } from '@/shared/src/modules/country-list/country-list-helpers'
import { convertCountryListResponseToCountrySlugMap } from '@/shared/src/modules/country-list/country-list-store'
import { getTranslatedOrTranslatableLocales } from '@/shared/src/modules/language/locales'

const i18n = createVueI18n((messages as unknown) as LocaleMessages)
const countryCodes = Object.keys(
  convertCountryListResponseToCountrySlugMap(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('i18n-iso-countries/langs/en.json').countries,
  ),
)

async function main() {
  const paths: SitemapItemLoose[] = [{ url: '/', changefreq: EnumChangefreq.DAILY, links: [] }]

  const groupedLocalizedSlugs = getGroupedLocalizedSlugs()

  for (const [originCode, originSlugs] of Object.entries(groupedLocalizedSlugs)) {
    const originKeys = transformKeys(
      mapValues(originSlugs, (item, locale) => ({
        params: { originSlug: item.origin, locale },
      })),
      (key) => `${key}-${originCode}`,
    )
    paths.push(
      createLocalizedEntry({ name: 'index-targeted' }, originKeys, {
        changefreq: EnumChangefreq.MONTHLY,
      }),
      createLocalizedEntry({ name: 'origin' }, originKeys, {
        changefreq: EnumChangefreq.WEEKLY,
      }),
    )

    for (const [destinationCode, destinationSlugs] of Object.entries(groupedLocalizedSlugs)) {
      if (originCode === destinationCode) {
        continue
      }

      const pairs = transformKeys(
        mapValues(originSlugs, (value, locale) => ({
          params: {
            originSlug: value.origin,
            destinationSlug: destinationSlugs[locale].destination,
            locale,
          },
        })),
        (key) => `${key}-${originCode}`,
      )
      paths.push(
        createLocalizedEntry({ name: 'destination' }, pairs, {
          changefreq: EnumChangefreq.WEEKLY,
        }),
      )
    }
  }

  return paths
}

function createLocalizedEntry(
  to: Location,
  appendPairs: Record<string, Location>,
  sitemapItem: Partial<SitemapItemLoose>,
): SitemapItemLoose {
  let primaryURL = ''
  const links = []
  for (const [locale, location] of Object.entries(appendPairs)) {
    const mergedLocation = merge({}, to, location)
    const url = generateHrefForRoute(mergedLocation)
    links.push({
      url,
      lang: locale,
    })

    if (mergedLocation.params?.locale === 'en') {
      primaryURL = url
      links.push({
        url,
        lang: 'x-default',
      })
    }
  }

  return merge(
    {
      url: primaryURL,
      links,
    },
    sitemapItem,
  )
}
const routers: Record<string, VueRouter> = {}
function generateHrefForRoute(to: Location) {
  i18n.locale = to.params?.locale ?? 'en'
  if (!routers[i18n.locale]) {
    routers[i18n.locale] = createGenericRouter(i18n)
  }
  return routers[i18n.locale].resolve(to).href
}

function getSlugsForLocale(
  locale: string,
): { origin: Record<string, string>; destination: Record<string, string> } {
  const fallbacks = convertCountryListResponseToCountrySlugMap(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('i18n-iso-countries/langs/en.json').countries,
  )
  let countriesFrom: CountryList, countriesTo: CountryList
  try {
    if (locale !== 'ru') {
      countriesFrom = countriesTo = convertCountryListResponseToCountrySlugMap(
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require(`i18n-iso-countries/langs/${locale}.json`).countries,
      )
    } else {
      countriesFrom = convertCountryListResponseToCountrySlugMap(
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('@/shared/src/i18n/declensions-ru/origin.json'),
      )
      countriesTo = convertCountryListResponseToCountrySlugMap(
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('@/shared/src/i18n/declensions-ru/destination.json'),
      )
    }
  } catch {
    countriesFrom = countriesTo = fallbacks
  }

  return {
    origin: countriesFrom,
    destination: countriesTo,
  }
}

function getGroupedLocalizedSlugs() {
  const localizedSlugs: Record<
    string,
    { origin: Record<string, string>; destination: Record<string, string> }
  > = {}

  for (const locale of getTranslatedOrTranslatableLocales()) {
    localizedSlugs[locale] = getSlugsForLocale(locale)
  }

  const groupedLocalizedSlugs: Record<
    string,
    Record<string, { origin: string; destination: string }>
  > = {}
  for (const countryCode of countryCodes) {
    groupedLocalizedSlugs[countryCode] = {}
    for (const locale of getTranslatedOrTranslatableLocales()) {
      groupedLocalizedSlugs[countryCode][locale] = {
        origin: localizedSlugs[locale]['origin'][countryCode],
        destination: localizedSlugs[locale]['destination'][countryCode],
      }
    }
  }

  return groupedLocalizedSlugs
}

main().then((paths) =>
  simpleSitemapAndIndex({
    limit: 100,
    hostname: 'https://openfortravel.org',
    sitemapHostname: 'https://cdn.openfortravel.org/sitemap/',
    destinationDir: path.resolve('./var/sitemap'),
    sourceData: paths as SitemapItemLoose[],
    gzip: false,
  }),
)
