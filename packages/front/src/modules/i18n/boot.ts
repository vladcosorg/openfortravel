import { QSsrContext } from '@quasar/app'
import { mapValues } from 'lodash'
import { ManualTranslator } from 'vue-auto-i18n'
import VueRouter, { Location } from 'vue-router'
import { Store } from 'vuex'

import { i18n } from '@/front/src/boot/5-i18n'
import { serverCache } from '@/front/src/misc/server-cache'
import { LanguageLocale } from '@/front/src/modules/i18n/types'
import { reloadRoutes } from '@/front/src/router/helpers'
import { StateInterface } from '@/front/src/store'
import { useI18n } from '@/shared/src/composables/use-plugins'

export function setLocale(locale: string): void {
  useI18n().locale = locale
  reloadRoutes()
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

let translator: ManualTranslator
export async function autoTranslateIfNecessary(
  currentLocale: string,
): Promise<void> {
  if (currentLocale === 'en') {
    return
  }

  if (!translator) {
    const { createAutoI18n } = await import(
      /* webpackChunkName: "auto-i18n" */ '@/front/src/misc/vue-auto-i18n.lazy'
    )
    translator = createAutoI18n(i18n)
    console.log(translator)
  }

  await translator(i18n.locale)
}
