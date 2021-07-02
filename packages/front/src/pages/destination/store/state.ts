export class StateClass {
  public currentOriginCode!: string
  public currentDestinationCode!: string
  public isEditingProfile = false

  constructor(state: NonNullable<StateClass>) {
    Object.assign(this, state)
  }
}

export type StateType = StateClass
