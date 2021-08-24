import { LiteDestinationDocument } from '@/shared/src/api/destinations/plain-destination'
import { IncompleteEncodedNodeCollection } from '@/shared/src/restriction-tree/converter'

export class StateClass {
  public isEditingProfile = false
  public outgoingRestrictions?: [string, IncompleteEncodedNodeCollection]
  public returnRestrictions?: [string, IncompleteEncodedNodeCollection]
  public originCountryFactsheet?: [string, LiteDestinationDocument]
  public destinationCountryFactsheet?: [string, LiteDestinationDocument]

  constructor(state?: Partial<StateClass>) {
    Object.assign(this, state)
  }
}

export type StateType = StateClass
