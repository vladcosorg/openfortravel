import { getRoutes } from '@/front/src/router/routes'
import {
  getI18nInstance,
  useRouter,
  useRoute,
} from '@/shared/src/composables/use-plugins'

export function reloadRoutes(): void {
  getRoutes(getI18nInstance()).map((route) => useRouter().addRoute(route))
}

export function getAbsoluteURL(relativeURL: string, hash?: string): string {
  return `https://openfortravel.org${relativeURL}${hash ? '#' + hash : ''}`
}

export function getCurrentRelativeURL(hash?: string): string {
  const path = hash ? useRoute().path : useRoute().fullPath
  return `${path}${hash ? '#' + hash : ''}`
}
