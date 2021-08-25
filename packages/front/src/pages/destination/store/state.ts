import { FactsheetCountryDocument } from '@/shared/src/models/country-factsheet/raw-country-factsheet'
import { IncompleteEncodedNodeCollection } from '@/shared/src/restriction-tree/converter'

export class StateClass {
  public isEditingProfile = false
  public outgoingRestrictions?: [string, IncompleteEncodedNodeCollection]
  public returnRestrictions?: [string, IncompleteEncodedNodeCollection]
  public originCountryFactsheet?: [string, FactsheetCountryDocument]
  public destinationCountryFactsheet?: [string, FactsheetCountryDocument]

  constructor(state?: Partial<StateClass>) {
    Object.assign(this, state)
  }
}

export type StateType = StateClass
