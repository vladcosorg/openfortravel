/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli/quasar-conf-js

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
  // https://v2.quasar.dev/quasar-cli/supporting-ts
  supportTS: {
    tsCheckerConfig: {
      eslint: {
        enabled: false,
        files: './src/**/*.{ts,tsx,js,jsx,vue}',
      },
    },
  },

  // https://v2.quasar.dev/quasar-cli/prefetch-feature
  preFetch: true,

  // app boot file (/src/boot)
  // --> boot files are part of "main.js"
  // https://v2.quasar.dev/quasar-cli/boot-files
  boot: [
    // '1-vue',
    '../../../shared/src/boot/use-setter',
    { path: '2-node-cache', client: false },
    // '~shared/src/boot/composition-api',

    // { path: '4-ssr-url-decoder', client: false },
    { path: '4.1-legacy-url-302', client: false },
    '5-i18n',
    { path: '3-ssr-data-preload', client: false },
    '6-country-detector',
    { path: '7-gtag', server: false },
    { path: '8-context', client: false },
  ],

  vendor: {
    disable: true,
    remove: [
      'i18n-iso-countries',
      'svg-country-flags',
      'quasar/src/components/table',
    ],
  },

  // https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
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

  // Full list of options: https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
  build: {
    devtool: 'eval-source-map',
    // vueCompiler: true,
    vueRouterMode: 'history', // available values: 'hash', 'history'
    env: {
      PROJECT_URL: context.prod
        ? 'https://openfortravel.org'
        : 'http://localhost:8080',
    },
    transpile: context.prod,

    // Add dependencies for transpiling with Babel (Array of string/regex)
    // (from node_modules, which are by default not transpiled).
    // Applies only if "transpile" is set to true.
    // transpileDependencies: [],

    // rtl: true, // https://v2.quasar.dev/options/rtl-support
    // preloadChunks: true,
    showProgress: true,
    // gzip: true,
    analyze: true,

    // Options below are automatically set depending on the env, set them if you want to override
    // extractCSS: false,

    // https://v2.quasar.dev/quasar-cli/handling-webpack
    // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
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
    extendWebpack(config) {
      const skipChecks = true
      config.resolve.alias['@'] = path.resolve(__dirname, '../..')
      config.resolve.plugins = [new TsconfigPathsPlugin()]
      config.externals = !config.externals ? [] : [config.externals]
      config.externals.push((context, request, callback) => {
        if (/xlsx|canvg|pdfmake/.test(request)) {
          return callback(null, 'commonjs ' + request)
        }
        callback()
      })

      // // linting is slow in TS projects, we execute it only for production builds
      if (context.prod && !context.debug) {
        //   if (!skipChecks) {
        //     config.module.rules.push({
        //       enforce: 'pre',
        //       test: /\.(js|vue)$/,
        //       loader: 'eslint-loader',
        //       exclude: /node_modules/,
        //     })
        //   }
        if (config.optimization.minimizer) {
          const terserOptions =
            config.optimization.minimizer[0].options.terserOptions
          terserOptions.compress['drop_console'] = true
          terserOptions.format = Object.assign(terserOptions.format || {}, {
            comments: false,
          })
        }
        //
        config.output.publicPath = 'https://cdn.openfortravel.org/www/'
      }
      //
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
      //
      // config.plugins.push(
      //   new FilterWarningsPlugin({
      //     exclude:
      //       /Critical dependency|dependency is an expression|require function is used|keyv|got/,
      //   }),
      // )
      // if (!config.stats) {
      //   config.stats = {}
      // }
      // config.stats.warningsFilter = [/dependency/]
      if (skipChecks) {
        config.plugins.shift()
      }
    },
  },

  // Full list of options: https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
  devServer: {
    https: false,
    port: 8080,
    host: '0.0.0.0',
    // disableHostCheck: true,
    open: false, // opens browser window automatically
    // staticOptions: {
    //   contentBase: path.join(__dirname, 'public'),
    //
    //   extensions: ['svg', 'webp'],
    // },
  },

  // https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
  framework: {
    config: {
      dark: true,
      loadingBar: {
        position: 'top',
        skipHijack: true,
        color: 'accent',
      },
      notify: {},
    },

    iconSet: 'material-icons', // Quasar icon set
    lang: 'en-US', // Quasar language pack

    // For special cases outside of where the auto-import strategy can have an impact
    // (like functional components as one of the examples),
    // you can manually specify Quasar components/directives to be available everywhere:
    //
    // components: [],
    // directives: [],

    // Quasar plugins
    plugins: ['Cookies', 'Meta', 'Notify', 'LoadingBar'],
    cssAddon: true,
  },

  // animations: 'all', // --- includes all animations
  // https://v2.quasar.dev/options/animations
  animations: [
    'fadeIn',
    'fadeOut',
    'fadeInRight',
    'fadeOutRight',
    'bounceInUp',
    'bounce',
  ],

  // https://v2.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
  ssr: {
    pwa: false,

    // manualStoreHydration: true,
    // manualPostHydrationTrigger: true,

    prodPort: 8080, // The default port that the production server should use
    // (gets superseded if process.env.PORT is specified at runtime)

    maxAge: 1000 * 60 * 60 * 24 * 30,
    // Tell browser when a file from the server should expire from cache (in ms)

    chainWebpackWebserver(/* chain */) {
      //
    },
    middlewares: [
      context.prod ? 'compression' : '',
      'render', // keep this as last one
    ],
  },
}))
