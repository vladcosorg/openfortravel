import { Timestamp } from '@firebase/firestore/lite'
import omit from 'lodash/omit'

import {
  factsheetDefaults,
  RawCountryFactsheet,
} from '@/shared/src/models/country-factsheet/raw-country-factsheet'
import { IncompleteEncodedNodeCollection } from '@/shared/src/restriction-tree/converter'

const fullDefault = {
  ...factsheetDefaults,
  restrictionTree: [] as IncompleteEncodedNodeCollection,
  lastUpdated: undefined as Timestamp | undefined,
  bestByDate: '',
}

export type DestinationDocument = Partial<Readonly<typeof fullDefault>>
export type MappedDestinationDocumentCollection = Record<
  string,
  DestinationDocument
>

export interface PlainDestination
  extends RawCountryFactsheet,
    Readonly<typeof fullDefault> {
  countryCode: string
}
export type MappedPlainDestinationCollection = Record<string, PlainDestination>

export function createPlainDestination(
  countryCode: string,
  document: DestinationDocument,
): PlainDestination {
  return Object.assign({ countryCode }, fullDefault, document)
}

export function createDestinationDocument(
  plainDestination: PlainDestination,
): DestinationDocument {
  return omit(plainDestination, 'countryCode')
}

export function getDestinationDocumentFields(): Array<
  keyof typeof fullDefault
> {
  return Object.keys(fullDefault) as Array<keyof typeof fullDefault>
}
