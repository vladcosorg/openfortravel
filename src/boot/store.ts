import { Cookies } from 'quasar'
import { boot } from 'quasar/wrappers'
import { getCookiesAPI } from 'src/misc/misc'
import { StateInterface } from 'src/store'
import VueRouter from 'vue-router'
import { Store } from 'vuex'

export let storeInstance: Store<StateInterface>
export let routerInstance: VueRouter
export let cookies: Cookies
export default boot(({ store, router, ssrContext }) => {
  storeInstance = store as Store<StateInterface>
  routerInstance = router
  cookies = getCookiesAPI(ssrContext)
})
