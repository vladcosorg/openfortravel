import type { RootStateType } from '@/front/src/store/state'
import type { GetterSignatures } from '@/front/src/store/types/getters'
import { getFullDestinationList } from '@/shared/src/api/destinations/helper'
import { createProfileContext } from '@/shared/src/models/profile-context/helper'
import { getCountryCodes as getAllCountryCodes } from '@/shared/src/modules/country-list/country-list-helpers'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

import type { GetterTree } from 'vuex'

export const getters: GetterTree<RootStateType, RootStateType> &
  GetterSignatures = {
  wrappedHostRules: (state) =>
    getFullDestinationList(state.hostRules, getAllCountryCodes()),
  currentOrigin: (_state, getters) =>
    getters.wrappedHostRules[getters.visitorOrigin],
  detectedCountryWithFallback: (_state, getters): string =>
    getters.visitorOrigin ?? 'us',
  visitorOrigin: (_state, getterse) =>
    getterse.visitorContextWithDefaults[RestrictionNodeType.ORIGIN],
  visitorContextWithDefaults: (state) =>
    createProfileContext(state.visitorContext),
}
