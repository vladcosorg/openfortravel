import { store } from 'quasar/wrappers'
import Vuex, { Store } from 'vuex'

import countryList from '@/shared/src/modules/country-list/country-list-store'
import type { CountryListState } from '@/shared/src/modules/country-list/country-list-store'

import type { Module } from 'vuex'

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
