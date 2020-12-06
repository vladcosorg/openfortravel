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

module.exports.extendApp = function ({ app, ssr }) {
  const express = require('express')
  const LRU = require('lru-cache')
  const axios = require('axios')
  const cache = new LRU()
  app.use(express.urlencoded({ extended: true }))
  app.post('/translate', async (req, res) => {
    let response = ''
    try {
      const body = new URLSearchParams(req.body)
      const hash = require('crypto')
        .createHash('md5')
        .update(body.toString(), 'utf8')
        .digest('hex')

      if (cache.has(hash)) {
        console.log('From cache!')
        return res.send(cache.get(hash))
      }

      response = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        new URLSearchParams(req.body),
      )

      cache.set(hash, response.data)
      console.log('Saved in cache ' + hash)
    } catch (error) {
      // console.log(error)
      return res.send(error.response.data)
    }
    // console.log(response.data)
    return res.json(response.data)
  })
  /*
     Extend the parts of the express app that you
     want to use with development server too.

     Example: app.use(), app.get() etc
  */
}
