import type { StateType } from '@/front/src/pages/destination/store/state'
import type { MutationSignatures } from '@/front/src/pages/destination/store/types/mutations'
import type { ActionSignatures as RootActionSignatures } from '@/front/src/store/types/actions'
import type { AugmentedActionContext } from '@/shared/src/misc/augmented-store'

export enum ActionTypes {
  fetchAll = 'fetchAll',
  fetchRestrictions = 'fetchRestrictions',
  fetchCountryFactsheets = 'fetchCountryFactsheets',
}
type Context = AugmentedActionContext<
  MutationSignatures,
  ActionSignatures,
  RootActionSignatures,
  StateType
>

export type ActionSignatures = {
  [ActionTypes.fetchAll](context: Context, force: boolean): Promise<void>
  [ActionTypes.fetchRestrictions](context: Context): Promise<void>
  [ActionTypes.fetchCountryFactsheets](context: Context): Promise<void>
}
