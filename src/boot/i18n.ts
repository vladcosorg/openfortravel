import { QSsrContext } from '@quasar/app'
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

import { useRouter } from 'src/composables/use-plugins'
import { useVuexRawState } from 'src/composables/use-vuex'
import { getCookiesAPI } from 'src/misc/misc'
import {
  CountryList,
  preloadLocalizedListLanguage,
} from 'src/modules/country-list/country-list-helpers'
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

export function setLocaleCookie(
  locale: string,
  ssrContext: QSsrContext | null | undefined,
): void {
  getCookiesAPI(ssrContext).set('locale', locale, {
    path: '/',
  })
}

export function getLocaleCookie(
  ssrContext: QSsrContext | null | undefined,
): string {
  return getCookiesAPI(ssrContext).get('locale')
}

export async function forwardToLocalizedURL() {
  const currentRoute = useRouter().currentRoute
  const params: Record<string, string> = { locale: i18n.locale }
  if (currentRoute.params.originSlug) {
    params['originSlug'] = useVuexRawState<CountryList>(
      'modules.countryList.slugMigrationOriginMap',
    )[currentRoute.params.originSlug]
  }
  const to = useRouter().resolve({ params })
  await useRouter()
    .push(to.href)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    .catch(() => {})
}

export async function changeLocale(newLocale: Locale): Promise<void> {
  if (i18n.locale === newLocale) {
    return
  }

  await preloadLocalizedListLanguage(newLocale)
  await preloadLanguageFiles(newLocale)

  i18n.locale = newLocale

  reloadRoutes()
  await forwardToLocalizedURL()
}

async function preloadLanguageFiles(lang: Locale): Promise<void> {
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
}

export default boot(async ({ app, store, ssrContext }) => {
  if (ssrContext) {
    const { default: messages } = (await import('src/i18n')) as LocaleMessages
    Object.entries(messages).map(([locale, messageObject]) =>
      i18n.setLocaleMessage(locale, messageObject as LocaleMessageObject),
    )

    const detectedLocale = extractLanguageFromURL(ssrContext?.url)

    if (detectedLocale) {
      i18n.locale = detectedLocale
      store.commit('setCurrentLocale', detectedLocale)

      await extend({
        i18nPluginInstance: i18n,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        apiKey: process.env.TRANSLATION_API_KEY!,
        sourceLanguage: 'en',
        apiProxyURL: 'http://localhost:8080/translate',
      })

      const fallbackLocale = i18n.fallbackLocale as string
      const ssrLocales: LocaleMessageObject = {
        [fallbackLocale]: i18n.getLocaleMessage(fallbackLocale),
      }

      const allLocales = i18n.messages
      if (detectedLocale !== fallbackLocale && allLocales[detectedLocale]) {
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

  reloadRoutes()

  app.i18n = i18n
  console.log('lold3')
})

function extractLanguageFromURL(url?: string): string | undefined {
  if (!url) {
    return
  }
  const matches = url.match(/\/([a-z]{2})\/?.*/)
  return matches !== null ? matches[1] : undefined
}
