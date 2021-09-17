import { createI18n, VueI18n } from 'vue-i18n'

export function createVueI18n(messages: VueI18n['messages']) {
  return createI18n({
    locale: 'en',
    legacy: false,
    globalInjection: true,
    fallbackLocale: 'en',
    warnHtmlMessage: false,
    silentTranslationWarn: true,
    messages,
  })
}
