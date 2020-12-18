const { resolve } = require('path')
module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,

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
    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
    // required to lint *.vue files
    'vue',
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
    // // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'import/no-unresolved': [2, { ignore: ['.vue$'] }],
    'import/no-unresolved': 'off',
    'import/extensions': ['warn', 'always', { js: 'never', ts: 'never' }],
    'import/extensions': 'off',
    'import/order': [
      'warn',
      { 'newlines-between': 'always', alphabetize: { order: 'asc' } },
    ],
    // 'import/no-unused-modules': [
    //   'warn',
    //   {
    //     unusedExports: true,
    //     missingExports: true,
    //     ignoreExports: [
    //       '**/*.d.ts',
    //       '**/babel.config.js',
    //       '**/quasar.conf.js',
    //       '**/*.vue',
    //       '**/src/boot/*.ts',
    //     ],
    //   },
    // ],
    'import/newline-after-import': 'warn',
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
    'no-console': 'warn',
    'vue/no-v-html': 'off',
    'unicorn/no-reduce': 'off',
    'arrow-body-style': ['warn', 'as-needed'],
    'prefer-arrow-callback': 'warn',
    curly: 'warn',
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
      '@typescript-eslint/parser': ['.ts', '.tsx'],
      'vue-eslint-parser': ['.vue'],
    },
    'import/resolver': {
      typescript: {
        project: ['tsconfig.json'],
      },
    },
  },
  overrides: [
    {
      files: 'packages/admin/**/*.*',
      rules: {
        'vue/no-bare-strings-in-template': 'off',
      },
    },
  ],
}