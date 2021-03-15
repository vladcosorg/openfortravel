import { store } from 'quasar/wrappers'
import Vuex, { Store } from 'vuex'

import { actions } from '@/front/src/store/actions'
import { getters } from '@/front/src/store/getters'
import { modules } from '@/front/src/store/modules'
import { mutations } from '@/front/src/store/mutations'
import { RootState, RootStateType, state } from '@/front/src/store/state'
import { ActionSignatures } from '@/front/src/store/types/actions'
import { GetterSignatures } from '@/front/src/store/types/getters'
import { MutationSignatures } from '@/front/src/store/types/mutations'
import { AugmentedStore } from '@/shared/src/misc/augmented-store'

export default store(({ Vue }) => {
  Vue.use(Vuex)

  return new Vuex.Store<RootState>({
    state,
    modules,
    mutations,
    actions,
    getters,
    strict: !!process.env.DEV,
  })
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
