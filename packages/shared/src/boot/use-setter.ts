import { setRouter, setStore } from '@/shared/src/composables/use-plugins'
import { boot } from 'quasar/wrappers'

export default boot(({ store, router }) => {
  setRouter(router)
  setStore(store)
})
