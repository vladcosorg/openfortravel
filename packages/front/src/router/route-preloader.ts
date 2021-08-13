import mapValues from 'lodash/mapValues'
import set from 'lodash/set'

import { serverCache } from '@/front/src/misc/server-cache'
import { originParameterTransformers } from '@/front/src/router/route-builders/origin'
import { createGenericRouter } from '@/front/src/router/routes'
import {
  EncodedParameters,
  ParameterTransformerMap,
} from '@/front/src/router/transformers/_types'
import { createVueI18n } from '@/shared/src/misc/i18n'

import type { IVueI18n } from 'vue-i18n'
import type VueRouter from 'vue-router'

export const routesThatNeedLocalization = [
  'origin',
  'destination',
  'index-targeted',
]
let clonedI18n: IVueI18n
function getLocalizedRouter(locale: string): VueRouter {
  if (!clonedI18n) {
    clonedI18n = createVueI18n(serverCache.i18nMessages)
  }

  clonedI18n.locale = locale
  return createGenericRouter(clonedI18n, process.env.SERVER)
}

export function pregenerateLocalizableRouter(): Record<
  string,
  Record<string, string>
> {
  return {}
  const routes: Record<string, Record<string, string>> = {}

  for (const locale of serverCache.availableLocales) {
    const router = getLocalizedRouter(locale)
    for (const routeName of routesThatNeedLocalization) {
      set(
        routes,
        [routeName, locale],
        router.resolve({
          name: 'origin',
          params: createPlaceholders(originParameterTransformers, { locale }),
        }).href,
      )
    }
  }
  return routes
}

export function createPlaceholders<T extends ParameterTransformerMap>(
  allParams: T,
  currentValues: Partial<EncodedParameters<T>>,
): EncodedParameters<T> {
  return Object.assign(
    {},
    mapValues(allParams, (_value, key) => `*${key}*`),
    mapValues(currentValues, (value, key) => allParams[key].encode(value)),
  )
}

export function replacePlaceholders(
  route: string,
  placeholders: Record<string, string>,
): string {
  for (const [placeholder, replacement] of Object.entries(placeholders)) {
    route = route.replace(`*${placeholder}*`, replacement)
  }

  return route
}

export function resolveRoute(
  routeName: string,
  locale: string,
  placeholders: Record<string, string>,
): string {
  return replacePlaceholders(
    serverCache.localizedRoutes[routeName][locale],
    placeholders,
  )
}
