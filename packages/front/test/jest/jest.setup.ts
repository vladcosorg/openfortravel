// No console.log() / setTimeout
// console.log = jest.fn(() => { throw new Error('Do not use console.log() in production') })
import { setI18n } from '@/shared/src/composables/use-plugins'

jest.setTimeout(1000)

// jest speedup when errors are part of the game
// Error.stackTraceLimit = 0

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
global.Promise = require('promise')

import Vue from 'vue'
import VueI18n from 'vue-i18n'

import messages from '@/shared/src/i18n/index'
import { createVueI18n } from '@/shared/src/misc/i18n'

Vue.use(VueI18n)
setI18n(createVueI18n(messages))
// do this to make sure we don't get multiple hits from both webpacks when running SSR
setTimeout(() => {
  // do nothing
}, 1)
