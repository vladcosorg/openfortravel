import { Cookies } from 'quasar'
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'
import { Store } from 'vuex'

import { i18n } from 'src/boot/i18n'
import { storeInstance, routerInstance, cookies } from 'src/boot/store'
import { StateInterface } from 'src/store'

export function useStore(): Store<StateInterface> {
  return storeInstance
}

export function useRouter(): VueRouter {
  return routerInstance
}

export function useCookies(): Cookies {
  return cookies
}

export function useI18n(): VueI18n {
  return i18n
}
