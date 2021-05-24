import type { GetterTree } from 'vuex'

import type { RootStateType } from '@/front/src/store/state'
import type { GetterSignatures } from '@/front/src/store/types/getters'
import { getFullDestinationList } from '@/shared/src/api/destinations/helper'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export const getters: GetterTree<RootStateType, RootStateType> &
  GetterSignatures = {
  wrappedHostRules: (state) => getFullDestinationList(state.hostRules),

  currentOrigin: (state, getters) =>
    getters.wrappedHostRules[state.detectedCountry],
  detectedCountryWithFallback: (state): string => state.detectedCountry ?? 'us',
  profileOriginISO: (state) => state.visitorContext[RestrictionNodeType.ORIGIN],
}
