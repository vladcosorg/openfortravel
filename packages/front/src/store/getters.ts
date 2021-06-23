import type { GetterTree } from 'vuex'

import type { RootStateType } from '@/front/src/store/state'
import type { GetterSignatures } from '@/front/src/store/types/getters'
import { getFullDestinationList } from '@/shared/src/api/destinations/helper'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export const getters: GetterTree<RootStateType, RootStateType> &
  GetterSignatures = {
  wrappedHostRules: (state) => getFullDestinationList(state.hostRules),

  currentOrigin: (_state, getters) =>
    getters.wrappedHostRules[getters.visitorOrigin],
  detectedCountryWithFallback: (_state, getters): string =>
    getters.visitorOrigin ?? 'us',
  visitorOrigin: (state) => state.visitorContext[RestrictionNodeType.ORIGIN],
  visitorContextWithDefaults: (state) =>
    Object.assign(
      {
        [RestrictionNodeType.CITIZENSHIP]: [
          state.visitorContext[RestrictionNodeType.ORIGIN],
        ],
      },
      state.visitorContext,
      {
        [RestrictionNodeType.DID_NOT_VISIT_COUNTRIES]: [
          ...state.visitorContext[RestrictionNodeType.DID_NOT_VISIT_COUNTRIES],
          state.visitorContext[RestrictionNodeType.ORIGIN],
        ],
        [RestrictionNodeType.CITIZENSHIP]: Array.isArray(
          state.visitorContext[RestrictionNodeType.CITIZENSHIP],
        )
          ? state.visitorContext[RestrictionNodeType.CITIZENSHIP]
          : [state.visitorContext[RestrictionNodeType.ORIGIN]],
      },
    ),
}
