export class StateClass {
  public currentOriginCode!: string
  public currentDestinationCode!: string

  constructor(state: NonNullable<StateClass>) {
    Object.assign(this, state)
  }
}

export type StateType = StateClass
