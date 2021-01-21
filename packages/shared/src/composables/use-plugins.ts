import { QSsrContext } from '@quasar/app'
import ky from 'ky-universal'
import { Cookies, LooseDictionary, Notify } from 'quasar'
import Vue from 'vue'
import VueI18n, { IVueI18n } from 'vue-i18n'
import VueRouter from 'vue-router'
import { Store } from 'vuex'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let storeInstance: Store<any>

export function setStore(instance: typeof storeInstance): void {
  storeInstance = instance
}

export function useStore(): typeof storeInstance {
  return storeInstance
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

export function useVueI18n(): {
  t: (key: VueI18n.Path, values?: VueI18n.Values) => VueI18n.TranslateResult
  i18n: typeof i18nInstance
} {
  const i18n = useI18n()
  const unbound = i18n.t
  return { i18n, t: unbound.bind(i18n) }
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
