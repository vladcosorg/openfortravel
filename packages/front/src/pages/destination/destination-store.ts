import { Store } from 'vuex'

import { useModule } from '@/front/src/composables/module'
import { actions } from '@/front/src/pages/destination/store/actions'
import { getters } from '@/front/src/pages/destination/store/getters'
import { mutations } from '@/front/src/pages/destination/store/mutations'
import { state, StateType } from '@/front/src/pages/destination/store/state'
import { ActionSignatures } from '@/front/src/pages/destination/store/types/actions'
import { GetterSignatures } from '@/front/src/pages/destination/store/types/getters'
import { MutationSignatures } from '@/front/src/pages/destination/store/types/mutations'
import { StateInterface } from '@/front/src/store/state'
import { AugmentedStore } from '@/shared/src/misc/augmented-store'

export const MODULE_ID = 'destinationPage'
export type StoreModule = ReturnType<typeof registerStoreModule>
type DestinationState = StateInterface & { [MODULE_ID]: StateType }
export const registerStoreModule = (store: Store<DestinationState>) => {
  useModule(MODULE_ID, {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
  })

  return new AugmentedStore<
    DestinationState,
    GetterSignatures,
    ActionSignatures,
    MutationSignatures,
    typeof MODULE_ID
  >(store, MODULE_ID)
}
