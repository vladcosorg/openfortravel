/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Note: This file is used for both PRODUCTION & DEVELOPMENT.
 * Note: Changes to this file (but not any file it imports!) are picked up by the
 * development server, but such updates are costly since the dev-server needs a reboot.
 */

module.exports.extendApp = async function ({app, ssr}) {
  const express = require('express')
  const LRU = require('lru-cache')
  const path = require('path')
  const axios = require('axios')
  const {Storage} = require('@google-cloud/storage')
  const storage = new Storage()
  const bucket = storage.bucket('translation-cache');

  if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({path: path.resolve('.env.development.node')})
  } else {
    const {
      SecretManagerServiceClient,
    } = require('@google-cloud/secret-manager')
    const client = new SecretManagerServiceClient()
    const [accessResponse] = await client.accessSecretVersion({
      name: 'projects/678272975127/secrets/TRANSLATION_API_KEY/versions/latest',
    })

    process.env.TRANSLATION_API_KEY = accessResponse.payload.data.toString()
  }

  const cache = new LRU()
  app.use(express.urlencoded({extended: true}))
  app.post('/translate', async (req, res) => {
    let response = ''
    try {
      const params = new URLSearchParams(req.body)
      params.set('key', process.env.TRANSLATION_API_KEY)
      const hash = require('crypto')
        .createHash('md5')
        .update(params.toString(), 'utf8')
        .digest('hex')
      if (cache.has(hash)) {
        return res.send(cache.get(hash))
      } else if ((await bucket.file(`${hash}`).exists())[0]) {
        const [contents] = await bucket.file(`${hash}`).download()
        cache.set(hash, contents)
        return res.json(JSON.parse(contents.toString()))
      }

      response = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        params,
      )
      cache.set(hash, response.data)
      await bucket.file(`${hash}`).save(JSON.stringify(response.data))
      console.log('Saved in cache ' + hash)
    } catch (error) {
      console.log(error)
      return res.status(error.response.status).send(error.response.data)
    }

    return res.status(response.status).json(response.data)
  })
}
