import { boot } from 'quasar/wrappers'
import Vue from 'vue'
import { extend } from 'vue-auto-i18n'
import VueI18n, {
  IVueI18n,
  LocaleMessageObject,
  LocaleMessages,
  Values,
  Locale,
} from 'vue-i18n'

import { reloadRoutes } from 'src/router'

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

  if (!i18n.messages[lang]) {
    try {
      const response = (await import(
        /* webpackChunkName: "lang-[request]" */ `src/i18n/${lang}.ts`
      )) as { default: LocaleMessageObject }
      i18n.setLocaleMessage(lang, response.default)
    } catch {
      //one
    }
  }

  i18n.locale = lang
}

export default boot(async ({ app, router, store, ssrContext }) => {
  if (ssrContext) {
    const { default: messages } = (await import('src/i18n')) as LocaleMessages
    Object.entries(messages).map(([locale, messageObject]) =>
      i18n.setLocaleMessage(locale, messageObject as LocaleMessageObject),
    )

    const detectedLocale = extractLanguageFromURL(ssrContext?.url)

    if (detectedLocale) {
      i18n.locale = detectedLocale
      store.commit('setCurrentLocale', detectedLocale)

      const fallbackLocale = i18n.fallbackLocale as string
      const ssrLocales: LocaleMessageObject = {
        [fallbackLocale]: i18n.getLocaleMessage(fallbackLocale),
      }

      if (detectedLocale !== fallbackLocale) {
        ssrLocales[detectedLocale] = i18n.getLocaleMessage(detectedLocale)
      }
      if (store) {
        store.commit('setLocales', ssrLocales)
      }
    }
  } else {
    i18n.locale = store.state.currentLocale
    Object.entries(store.state.locales).map(([locale, messageObject]) =>
      i18n.setLocaleMessage(locale, messageObject as LocaleMessageObject),
    )
  }

  reloadRoutes(router, ssrContext)

  extend({
    i18nPluginInstance: i18n,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    apiKey: process.env.TRANSLATION_API_KEY!,
    sourceLanguage: 'en',
    apiProxyURL: '/translate',
  })
  app.i18n = i18n
})

function extractLanguageFromURL(url?: string): string | undefined {
  if (!url) {
    return
  }
  const matches = url.match(/\/([a-z]{2})\/?.*/)
  return matches !== null ? matches[1] : undefined
}
