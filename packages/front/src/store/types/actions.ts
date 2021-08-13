import type { AugmentedActionContext } from '@/shared/src/misc/augmented-store'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

import type { RootStateType } from '@/front/src/store/state'
import type { MutationSignatures } from '@/front/src/store/types/mutations'

export enum RootActionTypes {
  assignSearchId = 'assignSearchId',
  updateVisitorProfileField = 'updateVisitorProfileField',
}

export type ActionSignatures = {
  [RootActionTypes.assignSearchId](
    context: Context,
    data: { visitorProfile: Partial<VisitorProfile> },
  ): Promise<void>
  [RootActionTypes.updateVisitorProfileField]<
    K extends keyof VisitorProfile,
    V extends VisitorProfile[K],
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
