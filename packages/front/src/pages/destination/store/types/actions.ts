import type { StateType } from '@/front/src/pages/destination/store/state'
import type { MutationSignatures } from '@/front/src/pages/destination/store/types/mutations'
import type { ActionSignatures as RootActionSignatures } from '@/front/src/store/types/actions'
import type { AugmentedActionContext } from '@/shared/src/misc/augmented-store'

export type CurrentCountryPair = {
  originCode: string
  destinationCode: string
}

export enum ActionTypes {
  fetchReturnRestriction = 'fetchReturnRestriction',
  fetch = 'fetch',
}
type Context = AugmentedActionContext<
  MutationSignatures,
  ActionSignatures,
  RootActionSignatures,
  StateType
>

export type ActionSignatures = {
  [ActionTypes.fetch](
    context: Context,
    countryPair: CurrentCountryPair,
  ): Promise<void>
  [ActionTypes.fetchReturnRestriction](
    context: Context,
    countryPair: { originCode: string; destinationCode: string },
  ): Promise<void>
}
