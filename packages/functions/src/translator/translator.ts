import sourceTranslations from '@/shared/src/i18n'
import * as functions from 'firebase-functions'
import {
  translateMessageObject,
  InMemoryCache,
  GoogleCloud,
} from 'vue-auto-i18n'

import { CloudStorageCache } from '@/functions/src/translator/cloud-storage-cache'

export const translate = functions.https.onRequest(async (req, res) => {
  const targetLanguage = req.query.targetLanguage
  if (
    !targetLanguage ||
    typeof targetLanguage !== 'string' ||
    targetLanguage.length > 2
  ) {
    res.status(400).send('Invalid target language')
    return
  }

  const response = await translateMessageObject(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sourceTranslations['en'] as any,
    targetLanguage,
    {
      cache: [new InMemoryCache(), new CloudStorageCache()],
      blacklistedPaths: [
        'page.country.route',
        'page.destination.route',
        'page.index.route',
      ],
      translationService: new GoogleCloud(
        functions.config().env.translation.apiKey,
      ),
    },
  )
  /// eslint-disable-next-line (@typescript-eslint/no-explicit-any
  // const existingTranslations = (sourceTranslations as Record<string, any>)[
  //   targetLanguage
  // ]
  //
  // if (existingTranslations) {
  //   merge(response, existingTranslations)
  // }

  res.status(200).json(response)
})
