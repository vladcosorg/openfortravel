import { store } from 'quasar/wrappers'
import { createStore, Store } from 'vuex'

import { actions } from '@/front/src/store/actions'
import { getters } from '@/front/src/store/getters'
import { modules } from '@/front/src/store/modules'
import { mutations } from '@/front/src/store/mutations'
import type { RootStateType } from '@/front/src/store/state'
import { state } from '@/front/src/store/state'
import type { ActionSignatures } from '@/front/src/store/types/actions'
import type { GetterSignatures } from '@/front/src/store/types/getters'
import type { MutationSignatures } from '@/front/src/store/types/mutations'
import { AugmentedStore } from '@/shared/src/misc/augmented-store'

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  example: unknown
}

export default store((/* { ssrContext } */) => {
  const Store = createStore<StateInterface>({
    state,
    modules,
    mutations,
    actions,
    getters,

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,
  })

  return Store
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const augmentedStore = (store: Store<RootStateType>) =>
  new AugmentedStore<
    RootStateType,
    GetterSignatures,
    ActionSignatures,
    MutationSignatures,
    undefined
  >(store)
