import { boot } from 'quasar/wrappers'
import VueI18n, { Locale, Values } from 'vue-i18n'

import { preloadQuasarLocale } from '@/front/src/misc/quasar-i18n'
import { fetchAllLocaleMessages } from '@/front/src/modules/i18n/fetchers'
import {
  preloadLocaleIntoPluginOnDemand,
  preloadLocaleMessageCollectionIntoPlugin,
  pushRequiredLocalesToStore,
} from '@/front/src/modules/i18n/loaders'
import { LanguageLocale } from '@/front/src/modules/i18n/types'
import { reloadRoutes } from '@/front/src/router'
import {
  setI18n,
  useEventBus,
  useRouter,
} from '@/shared/src/composables/use-plugins'
import { useVuexRawState } from '@/shared/src/composables/use-vuex'
import { createAutoI18n, createVueI18n } from '@/shared/src/misc/i18n'
import { getTranslatedOrTranslatableLocales } from '@/shared/src/misc/locales'
import {
  CountryList,
  preloadCountryListForLocale,
} from '@/shared/src/modules/country-list/country-list-helpers'
import { preloadNationalityListForLocale } from '@/shared/src/modules/nationality/nationality-helpers'

declare module 'vue/types/vue' {
  interface Vue {
    i18n: VueI18n
  }
}

export const i18n = createVueI18n()
const translate = createAutoI18n(i18n)

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

  await preloadCountryListForLocale(newLocale)
  await preloadLocaleIntoPluginOnDemand(newLocale, i18n)

  i18n.locale = newLocale

  reloadRoutes()
}

export default boot(async ({ app, store, ssrContext, redirect, router }) => {
  let currentLocale = store.state.serverLocale

  if (ssrContext) {
    currentLocale = extractLanguageFromURL(ssrContext?.url) ?? currentLocale
  }

  if (ssrContext) {
    preloadLocaleMessageCollectionIntoPlugin(
      i18n,
      await fetchAllLocaleMessages(),
    )
    await preloadCountryListForLocale(currentLocale)
    await preloadNationalityListForLocale(currentLocale)
    await preloadQuasarLocale(currentLocale, ssrContext)

    i18n.locale = currentLocale
    store.commit('setServerLocale', currentLocale)

    try {
      await translate(currentLocale)
    } catch {
      redirect('/en/from/united-states-of-america')
      return
    }
    store.commit('setAvailableLocales', getTranslatedOrTranslatableLocales())
    pushRequiredLocalesToStore(i18n, currentLocale, store)
  } else {
    preloadLocaleMessageCollectionIntoPlugin(i18n, store.state.locales)
    i18n.locale = currentLocale

    router.beforeEach(async (to, from, next) => {
      if (
        from.params.locale &&
        to.params.locale &&
        to.params.locale !== from.params.locale
      ) {
        if (i18n.locale !== to.params.locale) {
          await preloadLocaleIntoPluginOnDemand(to.params.locale, i18n)
          await preloadCountryListForLocale(to.params.locale)
          i18n.locale = to.params.locale
          reloadRoutes()
          next(to.path)
          return
        }

        next()
        return
      }

      // Locale cannot be parsed because the router is not reloaded yet
      if (!to.params.locale) {
        const newLocale = extractLanguageFromURL(to.path)

        // Cannot find any locale info in URL, got to next handler or 404
        if (!newLocale) {
          next()
          return
        }

        // This locale is already set, probably the router is not matched after all, go to 404
        if (i18n.locale === newLocale) {
          next()
          return
        }

        await preloadLocaleIntoPluginOnDemand(newLocale, i18n)
        await preloadCountryListForLocale(newLocale)
        i18n.locale = newLocale
        reloadRoutes()

        next(to.path)
        return
      }

      next()
    })

    useEventBus().$on(
      'locale-change',
      async (newLocale: string, done: () => void) => {
        if (i18n.locale === newLocale) {
          return
        }
        await preloadLocaleIntoPluginOnDemand(newLocale, i18n)
        await preloadCountryListForLocale(newLocale)

        i18n.locale = newLocale
        useEventBus().$on('translation-ready', async () => {
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

export function extractLanguageFromURL(
  url?: string,
): LanguageLocale | undefined {
  if (!url) {
    return
  }
  const matches = url.match(/\/([a-z]+)\/?.*/)
  return matches !== null ? matches[1] : undefined
}
