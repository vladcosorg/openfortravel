// eslint-disable-next-line import/no-unused-modules
import languages from 'iso-language-list/dist/generated/top10-speakers-then-az-value-label.json'
import { simpleSitemapAndIndex, SitemapItemLoose } from 'sitemap'

import { createVueI18n } from 'src/boot/i18n'
import messages from 'src/i18n'
import { CountryList } from 'src/modules/country-list/country-list-helpers'
import { convertCountryListResponseToCountrySlugMap } from 'src/modules/country-list/country-list-store'
import { createGenericRouter } from 'src/router/routes'

const i18n = createVueI18n(messages)

async function main() {
  const paths = [{ url: '/', changefreq: 'daily' }]
  const fallbacks = convertCountryListResponseToCountrySlugMap(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('i18n-iso-countries/langs/en.json').countries,
  )
  languages.map(({ value: locale }) => {
    i18n.locale = locale
    const router = createGenericRouter(i18n)
    paths.push({
      changefreq: 'daily',
      url: router.resolve({ name: 'index', params: { locale } }).href,
    })

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
          require('src/i18n/declensions-ru/origin.json'),
        )
        countriesTo = convertCountryListResponseToCountrySlugMap(
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          require('src/i18n/declensions-ru/destination.json'),
        )
      }
    } catch {
      countriesFrom = countriesTo = fallbacks
    }

    const origins = Object.values(countriesFrom)
    const destinations = Object.values(countriesTo)

    origins.forEach((originSlug) => {
      paths.push({
        changefreq: 'daily',
        url: router.resolve({ name: 'origin', params: { locale, originSlug } })
          .href,
      })

      destinations.forEach((destinationSlug) => {
        paths.push({
          changefreq: 'weekly',
          url: router.resolve({
            name: 'destination',
            params: { locale, originSlug, destinationSlug },
          }).href,
        })
      })
    })
  })

  await simpleSitemapAndIndex({
    hostname: 'https://openfortravel.org',
    destinationDir: './dist/ssr',
    sourceData: paths as SitemapItemLoose[],
    gzip: false,
  })
}

main().then(() => console.log('Done'))
