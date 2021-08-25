import * as functions from 'firebase-functions'
import ky from 'ky-universal'

const endpoints = [
  'https://us-central1-openfortravel.cloudfunctions.net/api/country-factsheets',
  'https://us-central1-openfortravel.cloudfunctions.net/translate?targetLanguage=fr',
  'https://openfortravel.org/pt/travel-restrictions/from-netherlands/',
]

async function runWarming(): Promise<void> {
  await Promise.all(endpoints.map((endpoint) => ky.get(endpoint)))
}

export const warmerPubsub = functions.pubsub
  .schedule('every 15 minutes')
  .onRun(async () => {
    await runWarming()
  })

export const warmer = functions.https.onRequest(async (req, res) => {
  await runWarming()
  res.status(200).send('good')
})
