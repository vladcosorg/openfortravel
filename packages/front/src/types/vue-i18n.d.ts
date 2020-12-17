import Vue from 'vue'
// eslint-disable-next-line unused-imports/no-unused-imports-ts,@typescript-eslint/no-unused-vars
import { IVueI18n } from 'vue-i18n'

declare module 'vue-i18n' {
  interface IVueI18n {
    vm: Vue
  }
}
