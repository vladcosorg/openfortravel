import { createI18n, LocaleMessages, VueMessageType } from 'vue-i18n'

export function createVueI18n(messages?: LocaleMessages<VueMessageType>) {
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
