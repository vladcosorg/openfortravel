import { createGenericRouter } from '@/front/src/router/routes'
import { useI18n, useRouter } from '@/shared/src/composables/use-plugins'

export function reloadRoutes(): void {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const freshRouter = createGenericRouter(useI18n(), {
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  }) as any
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(useRouter() as any).matcher = freshRouter.matcher
}

export function getFullURL(relativeURL: string, hash?: string): string {
  return `http://localhost:8080${relativeURL}${hash ? '#' + hash : ''}`
}

export function getCurrentURL(hash?: string): string {
  return getFullURL(useRouter().currentRoute.fullPath, hash)
}
