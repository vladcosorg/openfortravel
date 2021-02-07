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
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')

module.exports = configure((context) => ({
  sourceFiles: {
    rootComponent: 'src/app.vue',
  },
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
    'vue',
    { path: 'node-cache', client: false },
    '~shared/src/boot/composition-api',
    '~shared/src/boot/use-setter',
    'homepage-locale-redirect',
    { path: 'ssr-url-decoder', client: false },
    'i18n',
    'country-detector',
    { path: 'gtag', server: false },
    { path: 'ssr-data-preload', client: false },
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
    // 'roboto-font', // optional, you are not bound to it
    // 'material-icons', // optional, you are not bound to it
  ],

  // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
  build: {
    vueRouterMode: 'history', // available values: 'hash', 'history'
    transpile: context.prod && !context.debug,
    // Add dependencies for transpiling with Babel (Array of string/regex)
    // (from node_modules, which are by default not transpiled).
    // Applies only if "transpile" is set to true.
    // transpileDependencies: ['@vueuse', 'vue-demi'],

    // rtl: false, // https://quasar.dev/options/rtl-support
    // preloadChunks: true,
    // showProgress: false,
    // gzip: true,
    // analyze: true,
    // Options below are automatically set depending on the env, set them if you want to override
    // extractCSS: false,
    minify: !context.debug,

    // https://quasar.dev/quasar-cli/handling-webpack
    extendWebpack(config) {
      config.resolve.plugins = [new TsconfigPathsPlugin()]
      if (!config.externals) {
        config.externals = []
      } else {
        config.externals = [config.externals]
      }
      config.externals.push((context, request, callback) => {
        if (/xlsx|canvg|pdfmake/.test(request)) {
          // eslint-disable-next-line unicorn/no-null
          return callback(null, 'commonjs ' + request)
        }
        callback()
      })

      // linting is slow in TS projects, we execute it only for production builds
      if (context.prod && !context.debug) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
        })

        if (config.optimization.minimizer) {
          const terserOptions =
            config.optimization.minimizer[0].options.terserOptions
          terserOptions.compress['drop_console'] = true
          terserOptions.output = { comments: false }
        }

        // cfg.output.publicPath = 'https://storage.googleapis.com/oftassets/'
      }

      config.module.rules.push({
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
              { cleanupIDs: false },
            ],
          },
        },
      })

      config.plugins.push(
        new FilterWarningsPlugin({
          exclude: /Critical dependency|dependency is an expression|require function is used|keyv|got/,
        }),
      )
      if (!config.stats) {
        config.stats = {}
      }
      config.stats.warningsFilter = [/dependency/]
    },
    chainWebpack(config) {
      if (context.debug) {
        config.plugins.delete('hashed-module-ids')
        config.optimization.namedModules(true)
      }

      config.module
        .rule('images')
        .use('url-loader')
        .tap((options) => {
          options.limit = 1000
          return options
        })
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
    cssAddon: true,
    config: {
      dark: true,
      loadingBar: {
        position: 'bottom',
        skipHijack: true,
      },
      notify: {},
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
}))
