import { i18n } from '@/front/src/boot/i18n'
import { createGenericRouter } from '@/front/src/router/routes'
import { useRouter } from '@/shared/src/composables/use-plugins'

export function reloadRoutes(): void {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const freshRouter = createGenericRouter(i18n, {
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  }) as any
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(useRouter() as any).matcher = freshRouter.matcher
}
