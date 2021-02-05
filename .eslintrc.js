const { resolve } = require('path')

module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,
  ignorePatterns: ['.eslintrc.js'],

  // https://eslint.vuejs.org/user-guide/#how-to-use-custom-parser
  // Must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
  // `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted
  parserOptions: {
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser#configuration
    // https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#eslint
    // Needed to make the parser take into account 'vue' files
    extraFileExtensions: ['.vue'],
    parser: '@typescript-eslint/parser',
    project: './packages/**/tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },

  env: {
    browser: true,
    node: true,
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    //
    // Base ESLint recommended rules
    'eslint:recommended',
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
    // ESLint typescript rules
    'plugin:@typescript-eslint/recommended',
    // consider disabling this class of rules if linting takes too long
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // Uncomment any of the lines below to choose desired strictness,
    // but leave only one uncommented!
    // See https://eslint.vuejs.org/rules/#available-rules
    // 'plugin:vue/essential', // Priority A: Essential (Error Prevention)
    // 'plugin:vue/strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
    'plugin:vue/recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)
    // https://github.com/prettier/eslint-config-prettier#installation
    // usage with Prettier, provided by 'eslint-config-prettier'.

    'plugin:unicorn/recommended',

    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',

    'prettier',
    'prettier/vue',
    'prettier/unicorn',
    'prettier/@typescript-eslint',
  ],

  plugins: [
    // required to apply rules which need type information
    '@typescript-eslint',
    'import',
    'unused-imports',
  ],

  globals: {
    ga: true, // Google Analytics
    cordova: true,
    __statics: true,
    process: true,
    Capacitor: true,
    chrome: true,
  },

  // add your custom rules here
  rules: {
    'prefer-promise-reject-errors': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'warn',
    'arrow-body-style': ['warn', 'as-needed'],
    'prefer-arrow-callback': 'warn',
    curly: 'warn',

    // '@typescript-eslint/no-unsafe-call': 'off',
    // '@typescript-eslint/no-unsafe-assignment': 'off',
    // '@typescript-eslint/no-unsafe-return': 'off',
    // '@typescript-eslint/no-unsafe-member-access': 'off',
    // '@typescript-eslint/no-floating-promises': 'off',
    //
    // // TypeScript
    quotes: ['warn', 'single', { avoidEscape: true }],
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    //

    'import/no-unresolved': 'warn',
    'import/extensions': ['warn', 'always', { js: 'never', ts: 'never' }],
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
        groups: [
          'builtin',
          'external',
          'internal',
          'sibling',
          'parent',
          'index',
          'object',
        ],
      },
    ],
    'import/no-unused-modules': [
      'warn',
      {
        unusedExports: true,
        missingExports: true,
        src: ['..'],
        ignoreExports: [
          '**/*.d.ts',
          '**/babel.config.js',
          '**/quasar.conf.js',
          '**/*.vue',
          '**/src/boot/*.ts',
          '**/router/index.ts',
          '**/store/index.ts',
        ],
      },
    ],
    'import/newline-after-import': 'warn',
    'import/dynamic-import-chunkname': [
      'warn',
      {
        webpackChunknameFormat: '[a-zA-Z0-57-9-/_]+',
      },
    ],

    'unused-imports/no-unused-imports-ts': 'error',
    'unused-imports/no-unused-vars-ts': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    'unicorn/prevent-abbreviations': 'off',
    'unicorn/numeric-separators-style': 'warn',
    'unicorn/no-unsafe-regex': 'warn',
    'unicorn/no-unused-properties': 'warn',
    'unicorn/prefer-replace-all': 'warn',
    'unicorn/filename-case': 'off',
    'unicorn/no-array-reduce': 'off',

    'vue/no-v-html': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
        },
      },
    ],

    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: true,
        ignores: [],
      },
    ],
    'vue/no-bare-strings-in-template': 'warn',
    'vue/no-empty-component-block': 'warn',
    'vue/no-useless-v-bind': 'warn',
    'vue/component-tags-order': 'off',
    'vue/require-default-prop': 'off',
  },
  settings: {
    'import/parsers': {
      'vue-eslint-parser': ['.vue'],
    },
    'import/resolver': {
      alias: {
        map: [['@', '..']],
        extensions: ['.ts', '.js', '.vue'],
      },
      typescript: {
        project: 'packages/*/tsconfig.json',
      },
    },
  },
  overrides: [
    {
      files: [
        'packages/admin/**/*.*',
        'packages/front/**/privacy-policy.vue',
        'packages/front/**/terms.vue',
      ],
      rules: {
        'vue/no-bare-strings-in-template': 'off',
      },
    },
    {
      files: 'packages/shared/**/*.*',
      rules: {
        'import/no-unused-modules': [
          'warn',
          {
            unusedExports: true,
            missingExports: true,
            src: ['..'],
            ignoreExports: ['**/boot/*', '**/*.d.ts'],
          },
        ],
      },
    },
    {
      files: '*.*',
      rules: {
        'import/no-unused-modules': 'off',
      },
    },
  ],
}
