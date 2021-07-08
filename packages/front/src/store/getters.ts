import type { GetterTree } from 'vuex'

import type { RootStateType } from '@/front/src/store/state'
import type { GetterSignatures } from '@/front/src/store/types/getters'
import { getFullDestinationList } from '@/shared/src/api/destinations/helper'
import { transformCountryCodeToOriginSlug } from '@/shared/src/modules/country-list/country-list-helpers'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

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
  contextSlug: (_state, getters) => {
    const context = getters.visitorContextWithDefaults
    const segments: Partial<Record<keyof VisitorProfile, string>> = {
      [RestrictionNodeType.CITIZENSHIP]: '',
      [RestrictionNodeType.VACCINATED]: 'not-vaccinated',
    }

    for (const type of Object.keys(context) as Array<keyof VisitorProfile>) {
      switch (type) {
        case RestrictionNodeType.VACCINATED: {
          const value = context[type]

          if (!value) {
            break
          }

          segments[
            RestrictionNodeType.VACCINATED
          ] = `vaccinated-with-${value?.brand}`
          break
        }

        case RestrictionNodeType.CITIZENSHIP: {
          const value = transformCountryCodeToOriginSlug(context[type][0])
          segments[RestrictionNodeType.CITIZENSHIP] = `citizen-of-${value}`
          break
        }
      }
    }
    return '/as/' + Object.values(segments).join('/')
  },
}
