import { QSsrContext } from '@quasar/app'
import ky from 'ky-universal'
import type LRUCache from 'lru-cache'
import { Cookies, LooseDictionary, Notify } from 'quasar'
import Vue from 'vue'
import VueI18n, { IVueI18n, TranslateResult } from 'vue-i18n'
import VueRouter from 'vue-router'
import { Store } from 'vuex'

import { augmentedStore } from '@/front/src/store'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let storeInstance: Store<any>

export function setStore(instance: typeof storeInstance): void {
  storeInstance = instance
}

export function useStore(): typeof storeInstance {
  return storeInstance
}

export function useAugmentedStore() {
  return augmentedStore(useStore())
}

const eventBusInstance = new Vue()
export function useEventBus(): Vue {
  return eventBusInstance
}

let routerInstance: VueRouter

export function setRouter(instance: VueRouter): void {
  routerInstance = instance
}

export function useRouter(): VueRouter {
  return routerInstance
}

let i18nInstance: IVueI18n

export function setI18n(instance: typeof i18nInstance): void {
  i18nInstance = instance
}

export function useI18n(): typeof i18nInstance {
  return i18nInstance
}

type Translator<T extends TranslateResult> = (key: VueI18n.Path, values?: VueI18n.Values) => T
export function useVueI18n<T extends TranslateResult>(): {
  t: Translator<T>
  i18n: typeof i18nInstance
} {
  const i18n = useI18n()
  const unbound = i18n.t
  return { i18n, t: (unbound.bind(i18n) as unknown) as Translator<T> }
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let sharedCache: LRUCache<string, any> | undefined
export function setSharedCache(instance: typeof sharedCache): void {
  sharedCache = instance
}
export function useSharedCache(): typeof sharedCache {
  return sharedCache
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
