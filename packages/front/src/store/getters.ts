import { GetterTree } from 'vuex'

import { RootStateType } from '@/front/src/store/state'
import { GetterSignatures } from '@/front/src/store/types/getters'
import { getFullDestinationList } from '@/shared/src/api/destinations/helper'
import { getFullRestrictionsListForOrigin } from '@/shared/src/api/restrictions/helper'

export const getters: GetterTree<RootStateType, RootStateType> & GetterSignatures = {
  wrappedHostRules: (state) => getFullDestinationList(state.hostRules),
  sharedRestrictions: (state) => {
    if (!state.sharedRestrictions.originCode) {
      return {}
    }

    return getFullRestrictionsListForOrigin(
      state.sharedRestrictions.restrictions,
      state.sharedRestrictions.originCode,
    )
  },
  currentOrigin: (state, getters) => getters.wrappedHostRules[state.detectedCountry],
  detectedCountryWithFallback: (state): string => state.detectedCountry ?? 'us',
}
