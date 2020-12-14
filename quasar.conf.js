/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const {configure} = require('quasar/wrappers')

module.exports = configure(function (context) {
  return {
    // https://quasar.dev/quasar-cli/supporting-ts
    supportTS: {
      tsCheckerConfig: {
        eslint: true,
      },
    },

    // https://quasar.dev/quasar-cli/prefetch-feature
    preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/boot-files
    boot: [
      'axios',
      'vue',
      'composition-api',
      'homepage-locale-redirect',
      'store',
      {path: 'ssr-url-decoder', client: false},
      'i18n',
      'country-detector',
      'country-loader',
    ],

    vendor: {
      disable: true,
      remove: [
        'i18n-iso-countries',
        'svg-country-flags',
        'quasar/src/components/table',
      ],
    },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: ['app.sass'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

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

      // https://quasar.dev/quasar-cli/handling-webpack
      extendWebpack(cfg) {
        // linting is slow in TS projects, we execute it only for production builds
        if (context.prod) {
          cfg.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /node_modules/,
          })

          // cfg.output.publicPath = 'https://storage.googleapis.com/oftassets/'
        }

        cfg.module.rules.push({
          test: /\.vue$/,
          loader: 'vue-svg-inline-loader',
          options: {
            svgo: {
              plugins: [
                {
                  inlineStyles: {
                    onlyMatchedOnce: false,
                  },
                },
                {cleanupIDs: false},
              ],
            },
          },
        })
      },
      chainWebpack(cfg) {
        cfg.module
          .rule('images')
          .use('url-loader')
          .tap((options) => {
            options.limit = 1000
            return options
          })
        // cfg.plugins.store.delete('preload')
        // cfg.plugins.store.delete('prefetch')
        // cfg.plugins.delete('preload')
        // cfg.plugins.delete('prefetch')
        // chain
        //   .plugin('prefetch')
        //   .use(PreloadWebpackPlugin, [
        //     {
        //       rel: 'prefetch',
        //       include: 'asyncChunks',
        //       fileBlacklist: [/pdfmake.+\.js$/, /canvg.+\.js$/, /xlsx.+\.js$/],
        //     },
        //   ])
        //   .after('html-webpack')
      },
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8080,
      host: '0.0.0.0',
      disableHostCheck: true,
      open: false, // opens browser window automatically
      staticOptions: {
        contentBase: path.join(__dirname, 'public'),

        extensions: ['svg', 'webp'],
      },
    },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: 'material-icons', // Quasar icon set
      lang: 'en-us', // Quasar language pack
      config: {
        dark: true,
        loadingBar: {
          position: 'bottom',
          skipHijack: true,
        },
        notify: {
        }
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
      plugins: ['Cookies', 'Meta', 'Notify'],
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    // animations: [],
    animations: [
      'fadeIn',
      'fadeOut',
      'fadeInRight',
      'fadeOutRight',
      'bounceInUp',
      'bounce',
    ],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,
    },
  }
})
