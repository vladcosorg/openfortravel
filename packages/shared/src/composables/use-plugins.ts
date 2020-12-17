import Vue from 'vue'
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
