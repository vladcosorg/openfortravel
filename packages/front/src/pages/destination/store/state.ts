export class StateClass {
  public isEditingProfile = false

  constructor(state: Partial<StateClass>) {
    Object.assign(this, state)
  }
}

export type StateType = StateClass
