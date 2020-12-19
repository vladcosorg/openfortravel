import countryList from '@/shared/src/modules/country-list/country-list-store'
import { store } from 'quasar/wrappers'
import Vuex, { Store } from 'vuex'

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  example: unknown
}

export default store(({ Vue }) => {
  Vue.use(Vuex)

  return new Store<StateInterface>({
    modules: {
      modules: {
        namespaced: true,
        modules: {
          countryList,
        },
      },
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING,
  })
})
