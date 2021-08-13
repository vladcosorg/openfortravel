import type Vue from 'vue'
// eslint-disable-next-line unused-imports/no-unused-imports-ts,@typescript-eslint/no-unused-vars

declare module 'vue-i18n' {
  interface IVueI18n {
    vm: Vue
  }
}
