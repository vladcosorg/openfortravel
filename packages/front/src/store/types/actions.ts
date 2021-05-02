import type { RootStateType } from '@/front/src/store/state'
import type { MutationSignatures } from '@/front/src/store/types/mutations'
import type { AugmentedActionContext } from '@/shared/src/misc/augmented-store'

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
