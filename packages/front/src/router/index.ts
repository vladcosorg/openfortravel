import { route } from 'quasar/wrappers'
import VueRouter from 'vue-router'
import { Store } from 'vuex'

import { StateInterface } from '@/front/src/store/state'

// eslint-disable-next-line import/no-unused-modules
export default route<Store<StateInterface>>(async ({ Vue }) => {
  Vue.use(VueRouter)
  return createEmptyRouter()
})

function createEmptyRouter(): VueRouter {
  return new VueRouter({
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  })
}

export function pathToURL(path: string): string {
  return `${process.env.APP_URL}${path}`
}
