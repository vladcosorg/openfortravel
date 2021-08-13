import type { StateType } from '@/front/src/pages/destination/store/state'
import type { MutationSignatures } from '@/front/src/pages/destination/store/types/mutations'
import type { ActionSignatures as RootActionSignatures } from '@/front/src/store/types/actions'
import type { AugmentedActionContext } from '@/shared/src/misc/augmented-store'

export type Links = Array<{
  url: Promise<string>
  title: string
  label: string
}>

export enum ActionTypes {}
type Context = AugmentedActionContext<
  MutationSignatures,
  ActionSignatures,
  RootActionSignatures,
  StateType
>

export type ActionSignatures = {}
