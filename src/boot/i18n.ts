import { boot } from 'quasar/wrappers'
import messages from 'src/i18n'
import Vue from 'vue'
import VueAutoI18n from 'vue-auto-i18n'
import VueI18n, { LocaleMessageObject } from 'vue-i18n'
import Locale = VueI18n.Locale

declare module 'vue/types/vue' {
  interface Vue {
    i18n: VueI18n
  }
}

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'ro',
  fallbackLocale: 'en',
  messages,
})
Vue.use(VueAutoI18n, {
  i18nPluginInstance: i18n,
  apiKey: process.env.TRANSLATION_API_KEY,
  sourceLanguage: 'en',
})

export async function changeLanguage(lang: Locale): Promise<void> {
  if (i18n.locale === lang) {
    return
  }

  try {
    const response = (await import(
      /* webpackChunkName: "lang-[request]" */ `src/i18n/${lang}.ts`
    )) as { default: LocaleMessageObject }
    i18n.setLocaleMessage(lang, response.default)
  } catch (e) {
    //one
  }
  i18n.locale = lang
}

export default boot(({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n
})
