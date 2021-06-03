import { createGenericRouter } from '@/front/src/router/routes'
import { useI18n, useRouter } from '@/shared/src/composables/use-plugins'

export function reloadRoutes(): void {
  const freshRouter = createGenericRouter(useI18n(), {
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  })
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(useRouter() as any).matcher = (freshRouter as any).matcher
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
