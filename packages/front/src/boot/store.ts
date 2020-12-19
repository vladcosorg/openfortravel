import { Cookies } from 'quasar'

import { getCookiesAPI } from '@/front/src/misc/misc'
import { StateInterface } from '@/front/src/store'
import { setCookies } from '@/shared/src/composables/use-plugins'
import { boot } from 'quasar/wrappers'
import VueRouter from 'vue-router'
import { Store } from 'vuex'

export let storeInstance: Store<StateInterface>
export let routerInstance: VueRouter
export let cookies: Cookies

export default boot(({ store, router, ssrContext }) => {
  storeInstance = store as Store<StateInterface>
  routerInstance = router
  setCookies(getCookiesAPI(ssrContext))
})
