import {
  PlainRestriction,
  PlainRestrictionCollection,
} from '@/shared/src/api/restrictions/models'

export class StateClass {
  public currentOriginCode?: string = undefined
  public currentDestinationCode?: string = undefined
  public returnRestriction?: PlainRestriction = undefined
  public relatedRestrictions: {
    destinationCode?: string
    restrictions: PlainRestrictionCollection
  } = { restrictions: [] }
}

export function state(): StateClass {
  return new StateClass()
}

export type StateType = ReturnType<typeof state>
