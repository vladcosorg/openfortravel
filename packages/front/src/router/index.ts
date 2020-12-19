import { route } from 'quasar/wrappers'
import VueRouter from 'vue-router'
import { Store } from 'vuex'

import { i18n } from '@/front/src/boot/i18n'
import { createGenericRouter } from '@/front/src/router/routes'
import { useRouter } from '@/shared/src/composables/use-plugins'

import { StateInterface } from '../store'

// eslint-disable-next-line import/no-unused-modules
export default route<Store<StateInterface>>(async ({ Vue }) => {
  Vue.use(VueRouter)
  return createRouter()
})

function createRouter(): VueRouter {
  return createGenericRouter(i18n, {
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  })
}

export function reloadRoutes(): void {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const freshRouter = createRouter() as any
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(useRouter() as any).matcher = freshRouter.matcher
}

export function pathToURL(path: string): string {
  return `${process.env.APP_URL}${path}`
}
