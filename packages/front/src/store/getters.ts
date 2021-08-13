import type { RootStateType } from '@/front/src/store/state'
import type { GetterSignatures } from '@/front/src/store/types/getters'
import { getFullDestinationList } from '@/shared/src/api/destinations/helper'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

import type { GetterTree } from 'vuex'

export const getters: GetterTree<RootStateType, RootStateType> &
  GetterSignatures = {
  wrappedHostRules: (state) => getFullDestinationList(state.hostRules),

  currentOrigin: (_state, getters) =>
    getters.wrappedHostRules[getters.visitorOrigin],
  detectedCountryWithFallback: (_state, getters): string =>
    getters.visitorOrigin ?? 'us',
  visitorOrigin: (_state, getterse) =>
    getterse.visitorContextWithDefaults[RestrictionNodeType.ORIGIN],
  visitorContextWithDefaults: (state) => {
    const origin = state.visitorContext[RestrictionNodeType.ORIGIN] ?? 'us'
    return Object.assign({}, state.visitorContext, {
      [RestrictionNodeType.ORIGIN]: origin,
      [RestrictionNodeType.CITIZENSHIP]: state.visitorContext[
        RestrictionNodeType.CITIZENSHIP
      ] ?? [origin],
      [RestrictionNodeType.DID_NOT_VISIT_COUNTRIES]: [
        origin,
        ...(state.visitorContext[RestrictionNodeType.DID_NOT_VISIT_COUNTRIES] ||
          []),
      ],
    })
  },
}
