import { getRoutes } from '@/front/src/router/routes'
import {
  useI18n,
  useRouter,
  useRoute,
} from '@/shared/src/composables/use-plugins'

export function reloadRoutes(): void {
  getRoutes(useI18n()).map((route) => useRouter().addRoute(route))
}

export function getAbsoluteURL(relativeURL: string, hash?: string): string {
  return `https://openfortravel.org${relativeURL}${hash ? '#' + hash : ''}`
}

export function getCurrentRelativeURL(hash?: string): string {
  const path = hash ? useRoute().path : useRoute().fullPath
  return `${path}${hash ? '#' + hash : ''}`
}
