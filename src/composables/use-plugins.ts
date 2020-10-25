import { storeInstance, routerInstance, cookies } from 'src/boot/store'
import { i18n } from 'src/boot/i18n'
import { Cookies } from 'quasar'
import { StateInterface } from 'src/store'
import VueI18n from 'vue-i18n'
import VueRouter, { Route } from 'vue-router'

import { Store } from 'vuex'

export function useStore(): Store<StateInterface> {
  return storeInstance
}

export function useRouter(): VueRouter {
  return routerInstance
}

export function useCookies(): Cookies {
  return cookies
}

export function useRoute(): Route {
  return routerInstance.currentRoute
}
export function useI18n(): VueI18n {
  return i18n
}
