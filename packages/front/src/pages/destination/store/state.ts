import type { PlainRestriction } from '@/shared/src/api/restrictions/models'

export class StateClass {
  public currentOriginCode?: string = undefined
  public currentDestinationCode?: string = undefined
  public returnRestriction?: PlainRestriction = undefined
}

export function state(): StateClass {
  return new StateClass()
}

export type StateType = ReturnType<typeof state>
