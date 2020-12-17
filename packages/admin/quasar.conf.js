/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const { configure } = require('quasar/wrappers')
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')

module.exports = configure((context) => ({
  // https://quasar.dev/quasar-cli/supporting-ts
  supportTS: {
    tsCheckerConfig: {
      configFile: path.resolve('./tsconfig.json'),
      eslint: true,
    },
  },

  // https://quasar.dev/quasar-cli/prefetch-feature
  preFetch: true,

  // app boot file (/src/boot)
  // --> boot files are part of "main.js"
  // https://quasar.dev/quasar-cli/boot-files
  boot: ['~shared/src/boot/composition-api', '~shared/src/boot/use-setter'],

  // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
  css: ['app.sass'],

  // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
  build: {
    vueRouterMode: 'history', // available values: 'hash', 'history'

    // Add dependencies for transpiling with Babel (Array of string/regex)
    // (from node_modules, which are by default not transpiled).
    // Applies only if "transpile" is set to true.
    // transpileDependencies: [],

    // rtl: false, // https://quasar.dev/options/rtl-support
    // preloadChunks: true,
    // showProgress: false,
    // gzip: true,
    // analyze: true,
    // Options below are automatically set depending on the env, set them if you want to override
    // extractCSS: false,
    // minify: false,
    chainWebpack(config) {
      // config.plugins.delete('ts-checker')
    },
    // https://quasar.dev/quasar-cli/handling-webpack
    extendWebpack(config) {
      config.resolve.plugins = [new TsconfigPathsPlugin()]
      config.resolve.alias = {
        app: config.resolve.alias.app,
      }
      // linting is slow in TS projects, we execute it only for production builds
      if (context.prod) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
        })
      }
    },
  },

  // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
  devServer: {
    https: false,
    port: 8081,
    host: '0.0.0.0',
    disableHostCheck: true,
    open: false, // opens browser window automatically
    staticOptions: {
      contentBase: path.join(__dirname, 'public'),
    },
  },

  // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
  framework: {
    iconSet: 'material-icons', // Quasar icon set
    lang: 'en-us', // Quasar language pack
    config: {
      dark: true,
    },

    // Possible values for "importStrategy":
    // * 'auto' - (DEFAULT) Auto-import needed Quasar components & directives
    // * 'all'  - Manually specify what to import
    importStrategy: 'auto',

    // For special cases outside of where "auto" importStrategy can have an impact
    // (like functional components as one of the examples),
    // you can manually specify Quasar components/directives to be available everywhere:
    //
    // components: [],
    // directives: [],
    components: [],
    // Quasar plugins
    plugins: [],
  },

  // animations: 'all', // --- includes all animations
  // https://quasar.dev/options/animations
  // animations: [],
  animations: [],
}))
