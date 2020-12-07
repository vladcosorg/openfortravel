import { Cookies } from 'quasar'
import Vue from 'vue'
import { IVueI18n } from 'vue-i18n'
import VueRouter from 'vue-router'
import { Store } from 'vuex'

import { i18n } from 'src/boot/i18n'
import { storeInstance, routerInstance, cookies } from 'src/boot/store'
import { eventBus } from 'src/boot/vue'
import { StateInterface } from 'src/store'

export function useStore(): Store<StateInterface> {
  return storeInstance
}

export function useRouter(): VueRouter {
  return routerInstance
}
// eslint-disable-next-line import/no-unused-modules
export function useCookies(): Cookies {
  return cookies
}

export function useI18n(): IVueI18n {
  return i18n
}

export function useEventBus(): Vue {
  return eventBus
}
