import { createI18n, VueI18n } from 'vue-i18n'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createVueI18n(messages: VueI18n['messages']) {
  return createI18n({
    locale: 'en',
    legacy: true,
    globalInjection: true,
    fallbackLocale: 'en',
    warnHtmlMessage: false,
    silentTranslationWarn: true,
    messages,
  })
}
