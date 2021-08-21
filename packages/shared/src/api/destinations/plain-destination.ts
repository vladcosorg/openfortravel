import { Timestamp } from '@firebase/firestore/lite'
import omit from 'lodash/omit'

import { EncodedTreeNode } from '@/shared/src/restriction-tree/converter'

export enum RiskLevel {
  NO_DATA = 'no-data',
  LOW = 'low',
  MODERATE = 'moderate',
  HIGH = 'high',
  VERY_HIGH = 'very-high',
}

const defaults = {
  infoLink: '',
  bestByDate: '',
  isHealthDeclarationRequired: false,
  healthDeclarationDocURL: '',
  riskLevel: RiskLevel.NO_DATA,
  testValidityInHours: 48,
  selfIsolationInDays: 14,
  visitedRestrictedCountriesDaysAgo: 0,
  testOnArrival: false,
  proofOfRecoveryInDays: 0,
  thisWeekCasesPer100K: 0,
  lastWeekCasesPer100K: 0,
  restrictionTree: [] as Array<Partial<EncodedTreeNode>>,
  lastUpdated: undefined as Timestamp | undefined,
  maskRestrictions: undefined as undefined | 'public' | 'public-enclosed',
  restaurantRestrictions: undefined as
    | undefined
    | 'closed'
    | 'open-with-restrictions',
  barRestrictions: undefined as undefined | 'closed' | 'open-with-restrictions',
}

export type DestinationDocument = Partial<Readonly<typeof defaults>>
export type MappedDestinationDocumentCollection = Record<
  string,
  DestinationDocument
>

export interface PlainDestination extends Readonly<typeof defaults> {
  countryCode: string
}

export type MappedPlainDestinationCollection = Record<string, PlainDestination>

export function createPlainDestination(
  countryCode: string,
  document: DestinationDocument,
): PlainDestination {
  return Object.assign({ countryCode }, defaults, document)
}

export function createDestinationDocument(
  plainDestination: PlainDestination,
): DestinationDocument {
  return omit(plainDestination, 'countryCode')
}
