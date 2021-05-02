import Vue from 'vue'
import type { IVueI18n, LocaleMessages } from 'vue-i18n';
import VueI18n from 'vue-i18n'

export function createVueI18n(messages?: LocaleMessages): IVueI18n {
  Vue.use(VueI18n)
  return (new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    silentTranslationWarn: true,
    messages,
  }) as unknown) as IVueI18n
}
