import { storeInstance, routerInstance, cookies } from 'boot/store'
import { i18n } from 'boot/i18n'

export function useStore() {
  return storeInstance
}

export function useRouter() {
  return routerInstance
}

export function useCookies() {
  return cookies
}

export function useRoute() {
  return routerInstance.currentRoute
}
export function useI18n() {
  return i18n
}
