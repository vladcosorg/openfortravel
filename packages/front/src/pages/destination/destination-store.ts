import { useModule } from '@/front/src/composables/module'
import { actions } from '@/front/src/pages/destination/store/actions'
import { getters } from '@/front/src/pages/destination/store/getters'
import { mutations } from '@/front/src/pages/destination/store/mutations'
import type { StateType } from '@/front/src/pages/destination/store/state'
import { StateClass } from '@/front/src/pages/destination/store/state'
import type { ActionSignatures } from '@/front/src/pages/destination/store/types/actions'
import type { GetterSignatures } from '@/front/src/pages/destination/store/types/getters'
import type { MutationSignatures } from '@/front/src/pages/destination/store/types/mutations'
import type { StateInterface } from '@/front/src/store/state'
import { AugmentedStore } from '@/shared/src/misc/augmented-store'

import type { Store } from 'vuex'

export const MODULE_ID = 'destinationPage'
export type StoreModule = ReturnType<typeof registerStoreModule>
type DestinationState = StateInterface & { [MODULE_ID]: StateType }
export const registerStoreModule = (
  store: Store<DestinationState>,
  initialStateOverrides?: Partial<StateType>,
) => {
  useModule(MODULE_ID, {
    namespaced: true,
    state: function () {
      return new StateClass(initialStateOverrides)
    },
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
