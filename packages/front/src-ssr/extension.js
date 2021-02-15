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
const { InMemoryCache } = require('vue-auto-i18n')
const sharedCache = new InMemoryCache()
module.exports.extendApp = async function ({ app, ssr }) {
  const express = require('express')

  app.use(express.urlencoded({ extended: true }))
  app.use(function (req, res, next) {
    req.sharedCache = sharedCache
    next()
  })

  await require('./env')()
  require('./handlers/subscribe')(app)
  require('./handlers/send-message')(app)
}
