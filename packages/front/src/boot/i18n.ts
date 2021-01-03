import union from 'lodash/union'
import { boot } from 'quasar/wrappers'
import { extendWithAutoI18n } from 'vue-auto-i18n'
import autoLanguages from 'vue-auto-i18n/supported-languages/google.json'
import VueI18n, {
  Locale,
  LocaleMessageObject,
  LocaleMessages,
  Values,
} from 'vue-i18n'
import { Store } from 'vuex'

import { setQuasarLocale } from '@/front/src/misc/quasar-i18n'
import { reloadRoutes } from '@/front/src/router'
import { StateInterface } from '@/front/src/store'
import {
  setI18n,
  useEventBus,
  useRouter,
} from '@/shared/src/composables/use-plugins'
import { useVuexRawState } from '@/shared/src/composables/use-vuex'
import { createVueI18n } from '@/shared/src/misc/i18n'
import {
  CountryList,
  preloadLocalizedListLanguage,
} from '@/shared/src/modules/country-list/country-list-helpers'
import { preloadLocalizedNationalities } from '@/shared/src/modules/nationality/nationality-helpers'

declare module 'vue/types/vue' {
  interface Vue {
    i18n: VueI18n
  }
}

export const i18n = createVueI18n()
const translate = extendWithAutoI18n({
  i18nPluginInstance: i18n,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  apiKey: process.env.TRANSLATION_API_KEY!,
  sourceLanguage: 'en',
  apiProxyURL: `${process.env.PROJECT_URL}/translate`,
  automatic: true,
  blacklistedPaths: [
    'page.country.route',
    'page.destination.route',
    'page.index.route',
  ],
  onReady() {
    useEventBus().$emit('translation-ready')
  },
})

export const t = (key: string, values?: Values): string =>
  <string>i18n.t(key, values)

export function getLocalizedURL(): string {
  const currentRoute = useRouter().currentRoute
  const params: Record<string, string> = { locale: i18n.locale }
  if (currentRoute.params.originSlug) {
    params['originSlug'] = useVuexRawState<CountryList>(
      'modules.countryList.slugMigrationOriginMap',
    )[currentRoute.params.originSlug]
  }

  if (currentRoute.params.destinationSlug) {
    params['destinationSlug'] = useVuexRawState<CountryList>(
      'modules.countryList.slugMigrationDestinationMap',
    )[currentRoute.params.destinationSlug]
  }

  return useRouter().resolve({ params }).href
}

export async function forwardToLocalizedURL(): Promise<void> {
  await useRouter()
    .push(getLocalizedURL())
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    .catch(() => {})
}

export async function loadLocale(newLocale: Locale): Promise<string | void> {
  if (i18n.locale === newLocale) {
    return
  }

  await preloadLocalizedListLanguage(newLocale)
  await preloadLanguageFiles(newLocale)

  i18n.locale = newLocale

  reloadRoutes()
}

async function preloadLanguageFiles(lang: Locale): Promise<void> {
  if (!i18n.messages[lang]) {
    try {
      // eslint-disable-next-line import/dynamic-import-chunkname
      const response = (await import(
        /* webpackChunkName: "lang-[request]" */ `@/shared/src/i18n/${lang}.ts`
      )) as { default: LocaleMessageObject }
      i18n.setLocaleMessage(lang, response.default)
    } catch {
      //one
    }
  }
}

export default boot(async ({ app, store, ssrContext, redirect }) => {
  let currentLocale = store.state.serverLocale

  if (ssrContext) {
    currentLocale = extractLanguageFromURL(ssrContext?.url) ?? currentLocale
  }

  if (ssrContext) {
    const { default: messages } = await import(
      /* webpackChunkName: "all-i18n" */ '@/shared/src/i18n'
    )
    preloadLocalesIntoI18nPlugin(messages as LocaleMessages)
    await preloadLocalizedListLanguage(currentLocale)
    await preloadLocalizedNationalities(currentLocale)
    await setQuasarLocale(currentLocale, ssrContext)
    i18n.locale = currentLocale
    store.commit('setServerLocale', currentLocale)

    try {
      await translate(currentLocale)
    } catch {
      redirect('/en/')
      return
    }
    store.commit(
      'setAvailableLocales',
      union(Object.keys(messages), autoLanguages),
    )
    pushRequiredLocalesToClientStore(currentLocale, store)
  } else {
    preloadLocalesIntoI18nPlugin(store.state.locales)
    i18n.locale = currentLocale

    useEventBus().$on(
      'locale-change',
      async (newLocale: string, done: () => void) => {
        if (i18n.locale === newLocale) {
          return
        }
        i18n.locale = newLocale
        useEventBus().$on('translation-ready', async () => {
          await preloadLocalizedListLanguage(newLocale)
          await preloadLanguageFiles(newLocale)
          // await translate(newLocale)

          reloadRoutes()
          await forwardToLocalizedURL()
          done()
        })
      },
    )
  }

  reloadRoutes()
  app.i18n = i18n
  setI18n(i18n)
})

function extractLanguageFromURL(url?: string): string | undefined {
  if (!url) {
    return
  }
  const matches = url.match(/\/([a-z]+)\/?.*/)
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
