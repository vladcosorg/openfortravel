import { Timestamp } from '@firebase/firestore/lite'
import omit from 'lodash/omit'

import { IncompleteEncodedNodeCollection } from '@/shared/src/restriction-tree/converter'

export enum RiskLevel {
  NO_DATA = 'no-data',
  LOW = 'low',
  MODERATE = 'moderate',
  HIGH = 'high',
  VERY_HIGH = 'very-high',
}

const liteDefaults = {
  infoLink: '',

  riskLevel: RiskLevel.NO_DATA,
  thisWeekCasesPer100K: 0,
  lastWeekCasesPer100K: 0,

  maskRestrictions: undefined as undefined | 'public' | 'public-enclosed',
  restaurantRestrictions: undefined as
    | undefined
    | 'closed'
    | 'open-with-restrictions',
  barRestrictions: undefined as undefined | 'closed' | 'open-with-restrictions',
}
const fullDefault = {
  ...liteDefaults,
  restrictionTree: [] as IncompleteEncodedNodeCollection,
  lastUpdated: undefined as Timestamp | undefined,
  bestByDate: '',
}

export type DestinationDocument = Partial<Readonly<typeof fullDefault>>
export type MappedDestinationDocumentCollection = Record<
  string,
  DestinationDocument
>

export type LiteDestinationDocument = Partial<Readonly<typeof liteDefaults>>
export type MappedLiteDestinationDocumentCollection = Record<
  string,
  LiteDestinationDocument
>

export interface PlainCountryFactsheet extends Readonly<typeof liteDefaults> {
  countryCode: string
}
export interface PlainDestination
  extends PlainCountryFactsheet,
    Readonly<typeof fullDefault> {
  countryCode: string
}
export type MappedPlainDestinationCollection = Record<string, PlainDestination>

export type LiteMappedPlainDestinationCollection = Record<
  string,
  PlainCountryFactsheet
>

export function createPlainDestination(
  countryCode: string,
  document: DestinationDocument,
): PlainDestination {
  return Object.assign({ countryCode }, fullDefault, document)
}
export function createLightPlainDestination(
  countryCode: string,
  document?: LiteDestinationDocument,
): PlainCountryFactsheet {
  return Object.assign({ countryCode }, liteDefaults, document)
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

export function getLiteDestinationDocumentFIelds(): Array<
  keyof typeof liteDefaults
> {
  return Object.keys(liteDefaults) as Array<keyof typeof liteDefaults>
}
