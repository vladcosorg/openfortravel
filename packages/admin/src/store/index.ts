import { store } from 'quasar/wrappers'
import Vuex, { Module, Store } from 'vuex'

import countryList, {
  CountryListState,
} from '@/shared/src/modules/country-list/country-list-store'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StateInterface {}

export default store(({ Vue }) => {
  Vue.use(Vuex)

  return new Store<StateInterface>({
    modules: {
      modules: {
        namespaced: true,
        modules: {
          countryList: countryList as Module<CountryListState, StateInterface>,
        },
      },
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING,
  })
})
