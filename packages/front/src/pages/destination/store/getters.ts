import type { GetterTree } from 'vuex'

import { createRestrictionFromDestination } from '@/front/src/composables/restrictions'
import { VisitedCountryQuestion } from '@/front/src/pages/destination/questions/items/visited-country-question'
import type { Question } from '@/front/src/pages/destination/questions/question'
import type { StateClass } from '@/front/src/pages/destination/store/state'
import type { GetterSignatures } from '@/front/src/pages/destination/store/types/getters'
import { DeclarationSummary } from '@/front/src/pages/destination/summary-items/items/declaration-summary'
import { InsuranceSummary } from '@/front/src/pages/destination/summary-items/items/insurance-summary'
import { IsolationSummary } from '@/front/src/pages/destination/summary-items/items/isolation-summary'
import { StatusSummary } from '@/front/src/pages/destination/summary-items/items/status-summary'
import { TestingSummary } from '@/front/src/pages/destination/summary-items/items/testing-summary'
import type { SummaryItem } from '@/front/src/pages/destination/summary-items/summary-item'
import type { RootStateType } from '@/front/src/store/state'
import type { MappedDestinationCollection } from '@/shared/src/api/destinations/models'
import { convertFromStorageFormat } from '@/shared/src/restriction-tree/converter'
import { EntryWays } from '@/shared/src/restriction-tree/entry-ways'
import { Matcher } from '@/shared/src/restriction-tree/matcher'
import { LogicNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorContext } from '@/shared/src/restriction-tree/visitor-context'

export const getters: GetterTree<StateClass, RootStateType> &
  GetterSignatures = {
  currentDestination: (state, _getters, _rootState, rootGetters) => {
    if (!state.currentDestinationCode) {
      return
    }

    const destinations: MappedDestinationCollection =
      rootGetters['wrappedHostRules']

    return destinations[state.currentDestinationCode]
  },

  currentReturnDestination: (state, _getters, _rootState, rootGetters) => {
    if (!state.currentOriginCode) {
      return
    }

    const destinations: MappedDestinationCollection =
      rootGetters['wrappedHostRules']

    return destinations[state.currentOriginCode]
  },

  returnRestriction: (_state, getters, rootState) =>
    createRestrictionFromDestination(
      getters.currentReturnDestination!,
      Object.assign({}, rootState.visitorContext, {
        origin: getters.currentDestination!.countryCode,
      }),
    ),

  questions: (_state, getters): Question[] => {
    const restriction = getters.currentRestriction
    const destination = getters.currentDestination

    if (!restriction || !destination) {
      return []
    }

    return []
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
  entryWays(_state, getters, rootState) {
    const nodes = convertFromStorageFormat({
      type: LogicNodeType.OR,
      children: getters.currentDestination?.restrictionTree ?? [],
    })
    const matcher = new Matcher(nodes.resolveTreeNodes())
    return new EntryWays(matcher, new VisitorContext(rootState.visitorContext))
  },
}
