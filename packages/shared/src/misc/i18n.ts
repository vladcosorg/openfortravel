import { createI18n, LocaleMessages } from 'vue-i18n'







export function createVueI18n(
  messages?: LocaleMessages,
): ReturnType<typeof createI18n> {
  return createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    silentTranslationWarn: true,
    messages,
  })


}
