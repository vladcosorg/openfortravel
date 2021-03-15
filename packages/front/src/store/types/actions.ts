import { RootStateType } from '@/front/src/store/state'
import { MutationSignatures } from '@/front/src/store/types/mutations'
import { AugmentedActionContext } from '@/shared/src/misc/augmented-store'

export enum RootActionTypes {
  fetchHostRules = 'fetchHostRules',
  fetchSharedRestrictions = 'fetchSharedRestrictions',
}

export type ActionSignatures = {
  [RootActionTypes.fetchHostRules](context: Context): Promise<void>
  [RootActionTypes.fetchSharedRestrictions](
    context: Context,
    originCode: string,
  ): Promise<void>
}

type Context = AugmentedActionContext<
  MutationSignatures,
  ActionSignatures,
  ActionSignatures,
  RootStateType
>
