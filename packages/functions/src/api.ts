import * as functions from 'firebase-functions'

export const api = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', 'https://openfortravel.org') // don't forget to change this to your domain !
  res.status(200).send('good')
})
