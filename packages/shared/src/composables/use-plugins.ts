import ky from 'ky-universal'
import { Cookies, Notify } from 'quasar'
import { TranslateResult } from 'vue-i18n'
import { Store } from 'vuex'

import { augmentedStore } from '@/front/src/store'
import { createVueI18n } from '@/shared/src/misc/i18n'

import type { QSsrContext } from '@quasar/app'
import type { LooseDictionary } from 'quasar'
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let storeInstance: Store<any>

export function setStore(instance: typeof storeInstance): void {
  storeInstance = instance
}

export function useStore(): typeof storeInstance {
  return storeInstance
}

export function useRootStore(): ReturnType<typeof augmentedStore> {
  return augmentedStore(useStore())
}

let routerInstance: Router

export function setRouter(instance: Router): void {
  routerInstance = instance
}

export function useRouter(): Router {
  return routerInstance
}

export function useRoute(): RouteLocationNormalizedLoaded {
  return routerInstance.currentRoute.value
}
let i18nInstance: ReturnType<typeof createVueI18n>['global']

export function setI18n(instance: typeof i18nInstance): void {
  i18nInstance = instance
}

export function useI18n(): typeof i18nInstance {
  return i18nInstance
}

type Translator<T extends TranslateResult> = (
  key: VueI18n.Path,
  values?: VueI18n.Values,
) => T
export function useVueI18n<T extends TranslateResult>(): {
  t: Translator<T>
  i18n: typeof i18nInstance
} {
  const i18n = useI18n()
  const unbound = i18n.t
  return { i18n, t: unbound.bind(i18n) as unknown as Translator<T> }
}

export function useI18nWithPrefix<T extends TranslateResult>(
  prefixPath: VueI18n.Path,
): { t: Translator<T> } {
  const { t } = useVueI18n()
  return {
    t: (suffixPath, values?) => t(`${prefixPath}.${suffixPath}`, values) as T,
  }
}

let cookiesInstance: Cookies

export function initCookies(ssrContext?: QSsrContext | null): void {
  cookiesInstance = process.env.SERVER
    ? Cookies.parseSSR(ssrContext as LooseDictionary)
    : Cookies
}

export function useCookies(): typeof cookiesInstance {
  return cookiesInstance
}

let ssrContext: QSsrContext | null | undefined
export function setSSRContext(instance: typeof ssrContext): void {
  ssrContext = instance
}
export function useSSRContext(): typeof ssrContext {
  return ssrContext
}

export function useKy(): typeof ky {
  return ky.create({
    hooks: {
      afterResponse: [
        async (_request, _options, response) => {
          if (!response.ok) {
            // const { default: matError } = await import(
            //   '@quasar/extras/material-icons'
            // )
            Notify.create({
              // icon: matError,
              color: 'negative',
              message: 'An error occured. Please try again later.',
            })
          }
        },
      ],
    },
  })
}
