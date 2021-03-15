import { GetterTree } from 'vuex'

import { GeneralQuestion } from '@/front/src/pages/destination/questions/items/general-question'
import { ReturnQuestion } from '@/front/src/pages/destination/questions/items/return-question'
import { VisitedCountryQuestion } from '@/front/src/pages/destination/questions/items/visited-country-question'
import { Question } from '@/front/src/pages/destination/questions/question'
import { StateClass } from '@/front/src/pages/destination/store/state'
import { GetterSignatures } from '@/front/src/pages/destination/store/types/getters'
import { DeclarationSummary } from '@/front/src/pages/destination/summary-items/items/declaration-summary'
import { InsuranceSummary } from '@/front/src/pages/destination/summary-items/items/insurance-summary'
import { IsolationSummary } from '@/front/src/pages/destination/summary-items/items/isolation-summary'
import { StatusSummary } from '@/front/src/pages/destination/summary-items/items/status-summary'
import { TestingSummary } from '@/front/src/pages/destination/summary-items/items/testing-summary'
import { SummaryItem } from '@/front/src/pages/destination/summary-items/summary-item'
import { RootStateType } from '@/front/src/store/state'
import { MappedDestinationCollection } from '@/shared/src/api/destinations/models'
import {
  getFullRestrictionsListForDestination,
  wrapWithRichRestrictionObject,
} from '@/shared/src/api/restrictions/helper'
import { MappedRestrictionCollection } from '@/shared/src/api/restrictions/models'

export const getters: GetterTree<StateClass, RootStateType> & GetterSignatures = {
  relatedRestrictionList: (state) => {
    if (!state.relatedRestrictions.destinationCode) {
      return []
    }

    return getFullRestrictionsListForDestination(
      state.relatedRestrictions.restrictions,
      state.relatedRestrictions.destinationCode,
    )
  },

  relatedRestrictionForbiddenStringList: (_state, getters) =>
    getters.relatedRestrictionList
      .filter((restriction) => !restriction.isAllowed())
      .map((restriction) => restriction.originLabel),

  currentRestriction: (state, _getters, _rootState, rootGetters) => {
    if (!state.currentDestinationCode) {
      return
    }

    const restrictions: MappedRestrictionCollection = rootGetters['sharedRestrictions']

    return restrictions[state.currentDestinationCode]
  },
  returnRestriction: (state) => {
    if (!state.returnRestriction) {
      return
    }
    return wrapWithRichRestrictionObject(state.returnRestriction)
  },
  currentDestination: (state, _getters, _rootState, rootGetters) => {
    if (!state.currentDestinationCode) {
      return
    }

    const destinations: MappedDestinationCollection = rootGetters['wrappedHostRules']

    return destinations[state.currentDestinationCode]
  },

  currentReturnDestination: (state, _getters, _rootState, rootGetters) => {
    if (!state.currentOriginCode) {
      return
    }

    const destinations: MappedDestinationCollection = rootGetters['wrappedHostRules']

    return destinations[state.currentOriginCode]
  },

  questions: (_state, getters): Question[] => {
    const restriction = getters.currentRestriction
    const destination = getters.currentDestination

    if (!restriction || !destination) {
      return []
    }

    const visitedCountryQuestion = new VisitedCountryQuestion(restriction, destination)

    return [
      new GeneralQuestion(restriction, destination, visitedCountryQuestion),
      visitedCountryQuestion,
      new ReturnQuestion(restriction, destination),
    ].filter((question) => !question.skip)
  },

  getQuestionByType: (_state, getters) => (questionClass) => {
    const question = getters.questions
      .filter((question) => question.constructor === questionClass)
      .pop()

    if (!question) {
      throw new Error(`Question of type ${questionClass.name}`)
    }

    return question
  },

  summaryItems: (_state, getters): SummaryItem[] => {
    const restriction = getters.currentRestriction
    const destination = getters.currentDestination

    if (!restriction || !destination) {
      return []
    }

    return [
      new StatusSummary(
        restriction,
        destination,
        getters.getQuestionByType(VisitedCountryQuestion),
      ),
      new TestingSummary(restriction, destination),
      new IsolationSummary(restriction, destination),
      new InsuranceSummary(restriction, destination),
      new DeclarationSummary(restriction, destination),
    ].filter((item) => !item.disabled)
  },
}
