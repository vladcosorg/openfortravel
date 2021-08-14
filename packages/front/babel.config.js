/* eslint-env node */

module.exports = (api) => ({
  plugins: ['lodash'],
  presets: [
    [
      '@quasar/babel-preset-app',
      api.caller((caller) => caller && caller.target === 'node')
        ? { targets: { node: 'current' } }
        : {},
    ],
  ],
})
