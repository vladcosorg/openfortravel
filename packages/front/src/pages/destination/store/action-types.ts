import { ActionContext, DispatchOptions } from 'vuex'

import { Mutations } from '@/front/src/pages/destination/store/mutations'
import { StateType } from '@/front/src/pages/destination/store/state'
import { StateInterface } from '@/front/src/store'

export type CurrentCountryPair = {
  originCode: string
  destinationCode: string
}

export enum ActionTypes {
  fetchReturnRestriction = 'fetchReturnRestriction',
  fetchRelatedRestrictions = 'fetchRelatedRestrictions',
  fetch = 'fetch',
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
  dispatch<T extends DispatchOptions, K extends keyof Actions>(
    key: T extends { root: true } ? string : K,
    payload: Parameters<Actions[K]>[1],
    options?: T,
  ): ReturnType<Actions[K]>
} & Omit<ActionContext<StateType, StateInterface>, 'commit' | 'dispatch'>

export interface Actions {
  [ActionTypes.fetch](
    context: AugmentedActionContext,
    countryPair: CurrentCountryPair,
  ): Promise<void>
  [ActionTypes.fetchReturnRestriction](
    context: AugmentedActionContext,
    countryPair: { originCode: string; destinationCode: string },
  ): Promise<void>
  [ActionTypes.fetchRelatedRestrictions](
    context: AugmentedActionContext,
    destinationCode: string,
  ): Promise<void>
}

export type ActionProperties = {
  [P in keyof Actions]: (
    payload: Parameters<Actions[P]>[1],
  ) => ReturnType<Actions[P]>
}
