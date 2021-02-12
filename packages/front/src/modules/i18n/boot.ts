import { QSsrContext } from '@quasar/app'
import { mapValues } from 'lodash-es'
import { CacheType } from 'vue-auto-i18n'
import { Locale } from 'vue-i18n'
import VueRouter, { Location } from 'vue-router'
import { Store } from 'vuex'

import { i18n } from '@/front/src/boot/5-i18n'
import { serverCache } from '@/front/src/misc/server-cache'
import { preloadLocaleIntoPluginOnDemand } from '@/front/src/modules/i18n/loaders'
import { LanguageLocale } from '@/front/src/modules/i18n/types'
import { reloadRoutes } from '@/front/src/router/helpers'
import { StateInterface } from '@/front/src/store'
import { useI18n, useSharedCache } from '@/shared/src/composables/use-plugins'
import { preloadCountryListForLocale } from '@/shared/src/modules/country-list/country-list-helpers'

export function setLocale(locale: string): void {
  useI18n().locale = locale
  reloadRoutes()
}

export async function loadLocale(newLocale: Locale): Promise<string | void> {
  if (useI18n().locale === newLocale) {
    return
  }

  await preloadCountryListForLocale(newLocale)
  await preloadLocaleIntoPluginOnDemand(newLocale, i18n)

  setLocale(newLocale)
}

export function extractCurrentLocale(
  store: Store<StateInterface>,
  ssrContext: QSsrContext | null | undefined,
) {
  let currentLocale = store.state.serverLocale

  if (ssrContext) {
    currentLocale = extractLanguageFromURL(ssrContext?.url) ?? currentLocale
  }
  return currentLocale
}

export function extractLanguageFromURL(
  url?: string,
): LanguageLocale | undefined {
  if (!url) {
    return
  }
  const matches = url.match(/\/([a-z]+)\/?.*/)
  return matches !== null ? matches[1] : undefined
}

export function localeChangeHandler(
  currentLocale: string,
  router: VueRouter,
  ssrContext: QSsrContext,
): void | string {
  const routeConfig = { ...router.resolve(ssrContext?.url) }
  if (routeConfig.location.query?.tolocale) {
    const newLocale = routeConfig.location.query.tolocale as string
    setLocale(newLocale)

    return router.resolve({
      name: routeConfig.route.name as string,
      params: translateParams(routeConfig.location, currentLocale, newLocale),
    }).href
  }
}

function translateParams(
  route: Location,
  currentLocale: string,
  newLocale: string,
): Record<string, string> {
  return mapValues(route.params, (paramValue, paramKey) => {
    switch (paramKey) {
      case 'originSlug':
        return serverCache.translateOriginSlug(
          paramValue,
          currentLocale,
          newLocale,
        )

      case 'destinationSlug':
        return serverCache.translateDestinationSlug(
          paramValue,
          currentLocale,
          newLocale,
        )

      case 'locale':
        return newLocale
    }

    return paramValue
  })
}

export async function autoTranslateIfNecessary(
  currentLocale: string,
): Promise<void> {
  if (currentLocale === 'en') {
    return
  }

  const { createAutoI18n } = await import(
    /* webpackChunkName: "auto-i18n" */ '@/front/src/misc/vue-auto-i18n.lazy'
  )
  const translate = createAutoI18n(
    i18n,
    (useSharedCache() as unknown) as CacheType,
  )
  await translate(i18n.locale)
}
