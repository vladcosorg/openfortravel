import { Links } from '@/front/src/pages/destination/store/types/actions'

export class StateClass {
  public currentOriginCode!: string
  public currentDestinationCode!: string
  public isEditingProfile = false
  public relatedURLs = [] as Links

  constructor(state: NonNullable<StateClass>) {
    Object.assign(this, state)
  }
}

export type StateType = StateClass
