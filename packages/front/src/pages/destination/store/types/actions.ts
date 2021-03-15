import { StateType } from '@/front/src/pages/destination/store/state'
import { MutationSignatures } from '@/front/src/pages/destination/store/types/mutations'
import { ActionSignatures as RootActionSignatures } from '@/front/src/store/types/actions'
import { AugmentedActionContext } from '@/shared/src/misc/augmented-store'

export type CurrentCountryPair = {
  originCode: string
  destinationCode: string
}

export enum ActionTypes {
  fetchReturnRestriction = 'fetchReturnRestriction',
  fetchRelatedRestrictions = 'fetchRelatedRestrictions',
  fetch = 'fetch',
}
type Context = AugmentedActionContext<
  MutationSignatures,
  ActionSignatures,
  RootActionSignatures,
  StateType
>

export type ActionSignatures = {
  [ActionTypes.fetch](context: Context, countryPair: CurrentCountryPair): Promise<void>
  [ActionTypes.fetchReturnRestriction](
    context: Context,
    countryPair: { originCode: string; destinationCode: string },
  ): Promise<void>
  [ActionTypes.fetchRelatedRestrictions](
    context: Context,
    destinationCode: string,
  ): Promise<void>
}
