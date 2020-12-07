import { QSsrContext } from '@quasar/app'
import { boot } from 'quasar/wrappers'
import Vue from 'vue'
import { extendWithAutoI18n } from 'vue-auto-i18n'
import VueI18n, {
  IVueI18n,
  LocaleMessageObject,
  LocaleMessages,
  Values,
  Locale,
} from 'vue-i18n'
import { Store } from 'vuex'

import { eventBus } from 'src/boot/vue'
import { useRouter } from 'src/composables/use-plugins'
import { useVuexRawState } from 'src/composables/use-vuex'
import { getCookiesAPI } from 'src/misc/misc'
import {
  CountryList,
  preloadLocalizedListLanguage,
} from 'src/modules/country-list/country-list-helpers'
import { reloadRoutes } from 'src/router'
import { StateInterface } from 'src/store'

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
  let currentLocale = store.state.serverLocale
  const translate = extendWithAutoI18n({
    i18nPluginInstance: i18n,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    apiKey: process.env.TRANSLATION_API_KEY!,
    sourceLanguage: 'en',
    apiProxyURL: `${process.env.APP_URL}translate`,
    automatic: false,
    blacklistedPaths: ['page.country.route', 'page.destination.route'],
  })

  if (ssrContext) {
    currentLocale = extractLanguageFromURL(ssrContext?.url) ?? currentLocale
  }

  if (ssrContext) {
    const { default: messages } = await import('src/i18n')
    preloadLocalesIntoI18nPlugin(messages as LocaleMessages)

    i18n.locale = currentLocale
    store.commit('setServerLocale', currentLocale)

    await translate(currentLocale)
    pushRequiredLocalesToClientStore(currentLocale, store)
  } else {
    preloadLocalesIntoI18nPlugin(store.state.locales)
    i18n.locale = currentLocale

    eventBus.$on('locale-change', async (newLocale: string) => {
      if (i18n.locale === newLocale) {
        return
      }

      await preloadLocalizedListLanguage(newLocale)
      await preloadLanguageFiles(newLocale)
      await translate(newLocale)
      i18n.locale = newLocale

      reloadRoutes()
      await forwardToLocalizedURL()
    })
  }

  reloadRoutes()
  app.i18n = i18n
})

function extractLanguageFromURL(url?: string): string | undefined {
  if (!url) {
    return
  }
  const matches = url.match(/\/([a-z]{2})\/?.*/)
  return matches !== null ? matches[1] : undefined
}

function preloadLocalesIntoI18nPlugin(localeMessageCollection: LocaleMessages) {
  Object.entries(localeMessageCollection).map(([locale, messageObject]) =>
    i18n.setLocaleMessage(locale, messageObject as LocaleMessageObject),
  )
}

function pushRequiredLocalesToClientStore(
  currentLocale: string,
  store: Store<StateInterface>,
) {
  const fallbackLocale = i18n.fallbackLocale as string
  const ssrLocales: LocaleMessageObject = {
    [fallbackLocale]: i18n.getLocaleMessage(fallbackLocale),
  }

  const allLocales = i18n.messages
  if (currentLocale !== fallbackLocale && allLocales[currentLocale]) {
    ssrLocales[currentLocale] = i18n.getLocaleMessage(currentLocale)
  }

  store.commit('setLocales', ssrLocales)
}
