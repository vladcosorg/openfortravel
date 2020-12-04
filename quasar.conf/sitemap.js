/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const { simpleSitemapAndIndex } = require('sitemap')

let paths = ['/']
require('iso-language-list/dist/generated/top10-speakers-then-az-value-label.json').map(
  ({ value: language }) => {
    const countryCodes = Object.keys(
      require('i18n-iso-countries/langs/en.json').countries,
    ).map((value) => value.toLowerCase())
    paths.push(`/${language}/`)
    countryCodes.forEach((originCode) => {
      paths.push(`/${language}/travel/from/${originCode}/`)
      countryCodes.forEach((destinationCode) => {
        paths.push(
          `/${language}/travel/from/${originCode}/to/${destinationCode}/`,
        )
      })
    })
  },
)

paths = paths.map((url) => {
  return {
    url,
  }
})

// writes sitemaps and index out to the destination you provide.
simpleSitemapAndIndex({
  hostname: 'https://openfortravel.org',
  destinationDir: './dist/ssr',
  sourceData: paths,
}).then(() => {
  // Do follow up actions
})

// console.log(paths)
