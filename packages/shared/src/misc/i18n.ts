import VueI18n, {
  IVueI18n,
  Locale,
  LocaleMessageObject,
  LocaleMessages,
  Values,
} from 'vue-i18n'

export function createVueI18n(messages?: LocaleMessages): IVueI18n {
  return (new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    silentTranslationWarn: true,
    messages,
  }) as unknown) as IVueI18n
}
