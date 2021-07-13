import type { ActionTree } from 'vuex'

import type { StateClass } from '@/front/src/pages/destination/store/state'
import type {
  ActionSignatures,
  CurrentCountryPair,
  Links,
} from '@/front/src/pages/destination/store/types/actions'
import { ActionTypes } from '@/front/src/pages/destination/store/types/actions'
import { MutationTypes } from '@/front/src/pages/destination/store/types/mutations'
import { generateDestinationRoute } from '@/front/src/router/factory'
import type { StateInterface } from '@/front/src/store/state'
import {
  VaccineBrand,
  vaccineLabels,
} from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export const actions: ActionTree<StateClass, StateInterface> &
  ActionSignatures = {
  async [ActionTypes.fetchReturnRestriction](
    { commit, state },
    { originCode, destinationCode },
  ) {
    if (
      state.returnRestriction &&
      state.returnRestriction.origin === originCode &&
      state.returnRestriction.destination === destinationCode
    ) {
      return
    }
    // commit(
    //   MutationTypes.setReturnRestriction,
    //   undefined
    // )
  },

  async [ActionTypes.fetch](
    { commit, dispatch },
    countryPair: CurrentCountryPair,
  ) {
    commit(MutationTypes.setCurrentCountryPair, countryPair)
    // await dispatch(ActionTypes.fetchRelatedRestrictions, countryPair.destinationCode)
    // await dispatch(ActionTypes.fetchReturnRestriction, {
    //   originCode: countryPair.destinationCode,
    //   destinationCode: countryPair.originCode,
    // })
  },
  async [ActionTypes.init](
    { commit, dispatch },
    countryPair: CurrentCountryPair,
  ) {
    commit(MutationTypes.setCurrentCountryPair, countryPair)
    await dispatch(ActionTypes.fetchRelatedURLs)
  },

  async [ActionTypes.fetchRelatedURLs]({ commit, state }) {
    const destinationIso = state.currentDestinationCode
    const newLinks: Links = []

    for (const [id, label] of Object.entries(vaccineLabels)) {
      newLinks.push({
        title: `See restrictions for from {} to Bahams for travels vaccinated with ${label}`,
        label: `Restrictions for travellers vaccinated with ${label}`,
        url: await generateDestinationRoute({
          destinationCode: destinationIso,
          contextOverrides: {
            [RestrictionNodeType.VACCINATED]: {
              partial: false,
              brand: id as VaccineBrand,
            },
          },
        }),
      })
    }

    commit(MutationTypes.setRelatedURLs, newLinks)
  },
}
