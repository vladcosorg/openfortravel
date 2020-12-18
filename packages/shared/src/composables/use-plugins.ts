import Vue from 'vue'
import { IVueI18n } from 'vue-i18n'
import VueRouter from 'vue-router'
import { Store } from 'vuex'

let storeInstance: Store<never>

export function setStore(instance: typeof storeInstance) {
  storeInstance = instance
}

export function useStore(): typeof storeInstance {
  return storeInstance
}

let eventBusInstance: Vue
export function setEventBus(instance: Vue) {
  eventBusInstance = instance
}
export function useEventBus(): Vue {
  return eventBusInstance
}

let routerInstance: VueRouter

export function setRouter(instance: VueRouter) {
  routerInstance = instance
}

export function useRouter(): VueRouter {
  return routerInstance
}

let i18nInstance: IVueI18n

export function setVueI18n(instance: typeof i18nInstance) {
  i18nInstance = instance
}

export function useVueI18n(): typeof i18nInstance {
  return i18nInstance
}
