import { boot } from 'quasar/wrappers'
import { Store } from 'vuex'
import { StateInterface } from 'src/store'
import VueRouter from 'vue-router'
import { Cookies } from 'quasar'
import { getCookiesAPI } from 'src/misc/misc'
export let storeInstance: Store<StateInterface>
export let routerInstance: VueRouter
export let cookies: Cookies
export default boot(({ store, router, ssrContext }) => {
  storeInstance = store as Store<StateInterface>
  routerInstance = router
  cookies = getCookiesAPI(ssrContext)
})
