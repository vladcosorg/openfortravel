const { translateMessageObject, InMemoryCache } = require('vue-auto-i18n')
const CloudStorageCache = require('./cloud-storage-cache')
const sourceTranslations = require('shared/src/i18n/en')

const cache = [new InMemoryCache(), new CloudStorageCache()]

module.exports = function (app) {
  app.get('/translate', async (req, res) => {
    const targetLanguage = req.query.targetLanguage
    if (
      !targetLanguage ||
      typeof targetLanguage !== 'string' ||
      targetLanguage.length > 2
    ) {
      return res.status(400).send('Invalid target language')
    }

    const response = await translateMessageObject(
      sourceTranslations,
      req.query.targetLanguage,
      {
        cache,
        blacklistedPaths: [
          'page.country.route',
          'page.destination.route',
          'page.index.route',
        ],
      },
    )

    return res.status(200).json(response)
  })
}
