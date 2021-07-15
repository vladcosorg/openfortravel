import type { ActionTree } from 'vuex'

import type { StateClass } from '@/front/src/pages/destination/store/state'
import type { ActionSignatures } from '@/front/src/pages/destination/store/types/actions'
import type { StateInterface } from '@/front/src/store/state'

export const actions: ActionTree<StateClass, StateInterface> &
  ActionSignatures = {}
