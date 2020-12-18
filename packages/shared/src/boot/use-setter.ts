import { boot } from 'quasar/wrappers'

import { setRouter, setStore } from '@/shared/src/composables/use-plugins'

export default boot(({ store, router }) => {
  setRouter(router)
  setStore(store)
})
