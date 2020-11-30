import { boot } from 'quasar/wrappers'
import Vue from 'vue'
import { extend } from 'vue-auto-i18n'
import VueI18n, {
  IVueI18n,
  LocaleMessageObject,
  LocaleMessages,
  Values,
} from 'vue-i18n'

import Locale = VueI18n.Locale

declare module 'vue/types/vue' {
  interface Vue {
    i18n: VueI18n
  }
}
Vue.use(VueI18n)

export const i18n = (new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  silentTranslationWarn: true,
}) as unknown) as IVueI18n

export const t = (key: string, values?: Values): string => {
  return <string>i18n.t(key, values)
}

export async function changeLanguage(lang: Locale): Promise<void> {
  if (i18n.locale === lang) {
    return
  }

  try {
    const response = (await import(
      /* webpackChunkName: "lang-[request]" */ `src/i18n/${lang}.ts`
    )) as { default: LocaleMessageObject }
    i18n.setLocaleMessage(lang, response.default)
  } catch {
    //one
  }
  i18n.locale = lang
}

export default boot(async ({ app }) => {
  if (process.env.SERVER) {
    const { default: messages } = (await import('src/i18n')) as LocaleMessages
    Object.entries(messages).map(([locale, messageObject]) =>
      i18n.setLocaleMessage(locale, messageObject as LocaleMessageObject),
    )
  } else {
    const { default: fallbackMessages } = await import('src/i18n/en')
    i18n.setLocaleMessage('en', fallbackMessages)
  }

  extend({
    i18nPluginInstance: i18n,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    apiKey: process.env.TRANSLATION_API_KEY!,
    sourceLanguage: 'en',
    apiProxyURL: '/translate',
  })
  app.i18n = i18n
})
