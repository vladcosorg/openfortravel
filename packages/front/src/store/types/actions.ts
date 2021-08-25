import type { RootStateType } from '@/front/src/store/state'
import type { MutationSignatures } from '@/front/src/store/types/mutations'
import type { AugmentedActionContext } from '@/shared/src/misc/augmented-store'
import { ProfileContext } from '@/shared/src/models/profile-context/profile-context'

export enum RootActionTypes {
  assignSearchId = 'assignSearchId',
  updateVisitorProfileField = 'updateVisitorProfileField',
}

export type ActionSignatures = {
  [RootActionTypes.assignSearchId](
    context: Context,
    data: { visitorProfile: Partial<ProfileContext> },
  ): Promise<void>
  [RootActionTypes.updateVisitorProfileField]<
    K extends keyof ProfileContext,
    V extends ProfileContext[K],
  >(
    context: Context,
    data: { field: K; value: V },
  ): Promise<void>
}

type Context = AugmentedActionContext<
  MutationSignatures,
  ActionSignatures,
  ActionSignatures,
  RootStateType
>
