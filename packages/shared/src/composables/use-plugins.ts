import { QSsrContext } from '@quasar/app'
import { matError } from '@quasar/extras/material-icons'
import ky from 'ky-universal'
import { Cookies, LooseDictionary, Notify } from 'quasar'
import Vue from 'vue'
import { IVueI18n } from 'vue-i18n'
import VueRouter from 'vue-router'
import { Store } from 'vuex'

let storeInstance: Store<never>

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

let cookiesInstance: Cookies

export function initCookies(ssrContext?: QSsrContext | null): void {
  cookiesInstance = process.env.SERVER
    ? Cookies.parseSSR(ssrContext as LooseDictionary)
    : Cookies
}

export function useCookies(): typeof cookiesInstance {
  return cookiesInstance
}

export function useKy(): typeof ky {
  return ky.create({
    hooks: {
      afterResponse: [
        async (_request, _options, response) => {
          if (!response.ok) {
            Notify.create({
              icon: matError,
              color: 'negative',
              message: 'An error occured. Please try again later.',
            })
          }
        },
      ],
    },
  })
}
