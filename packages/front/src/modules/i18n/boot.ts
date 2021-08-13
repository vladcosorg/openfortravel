import { mapValues } from 'lodash'
import { RouteLocation, useRouter } from 'vue-router'

import { serverCache } from '@/front/src/misc/server-cache'
import type { LanguageLocale } from '@/front/src/modules/i18n/types'
import { reloadRoutes } from '@/front/src/router/helpers'
import type { StateInterface } from '@/front/src/store/state'
import { useCookies, useI18n } from '@/shared/src/composables/use-plugins'

import type { QSsrContext } from '@quasar/app'
import type { ManualTranslator } from 'vue-auto-i18n'
import type { Store } from 'vuex'

export function setLocale(locale: string): void {
  useI18n().locale = locale
  reloadRoutes()
}

export function extractCurrentLocale(
  store: Store<StateInterface>,
  ssrContext: QSsrContext | null | undefined,
): string {
  let currentLocale = store.state.serverLocale

  if (ssrContext) {
    currentLocale =
      extractLanguageFromURL(ssrContext.req.url) ??
      useCookies().get('locale') ??
      currentLocale
  }
  return currentLocale
}

export function extractLanguageFromURL(
  url?: string,
): LanguageLocale | undefined {
  if (!url) {
    return
  }
  const matches = /\/([a-z]+)\/?.*/.exec(url)
  return matches !== null ? matches[1] : undefined
}

export function localeChangeHandler(
  currentLocale: string,
  router: ReturnType<typeof useRouter>,
  ssrContext: QSsrContext,
): void | string {
  if (ssrContext.req.query.tolocale) {
    const routeConfig = { ...router.resolve(ssrContext.req.url) }
    const newLocale = routeConfig.query?.tolocale as string
    setLocale(newLocale)

    return router.resolve({
      name: routeConfig.name as string,
      params: translateParams(routeConfig, currentLocale, newLocale),
    }).href
  }
}

function translateParams(
  route: RouteLocation,
  currentLocale: string,
  newLocale: string,
): Record<string, string> {
  return mapValues(route.params, (paramValue, paramKey) => {
    switch (paramKey) {
      case 'originSlugg':
        return serverCache.translateOriginSlug(
          paramValue,
          currentLocale,
          newLocale,
        )

      case 'destinationSlugg':
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

let translator: ManualTranslator
export async function autoTranslateIfNecessary(
  currentLocale: string,
  i18n: ReturnType<typeof useI18n>,
): Promise<void> {
  if (currentLocale === 'en') {
    return
  }

  if (!translator) {
    const { createAutoI18n } = await import(
      /* webpackChunkName: "auto-i18n" */ '@/front/src/misc/vue-auto-i18n.lazy'
    )
    translator = createAutoI18n(i18n)
  }

  await translator(i18n.locale)
}
