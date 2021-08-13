import { useI18n, useRouter } from '@/shared/src/composables/use-plugins'

import { getRoutes } from '@/front/src/router/routes'

export function reloadRoutes(): void {
  const routes = getRoutes(useI18n()).map((route) =>
    useRouter().addRoute(route),
  )
}

export function getAbsoluteURL(relativeURL: string, hash?: string): string {
  return `https://openfortravel.org${relativeURL}${hash ? '#' + hash : ''}`
}

export function getCurrentAbsoluteURL(hash?: string): string {
  return getAbsoluteURL(useRouter().currentRoute.fullPath, hash)
}

export function getCurrentRelativeURL(hash?: string): string {
  const path = hash
    ? useRouter().currentRoute.path
    : useRouter().currentRoute.fullPath
  return `${path}${hash ? '#' + hash : ''}`
}
