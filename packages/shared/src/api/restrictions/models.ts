export enum RestrictionStatus {
  ALLOWED = 'allowed',
  CONDITIONAL = 'conditional',
  FORBIDDEN = 'forbidden',
}

export interface RestrictionDocument {
  isForbidden?: boolean
  notes?: string
  testRequired?: boolean
  insuranceRequired?: boolean
  selfIsolation?: boolean
  origin?: string
  destination?: string
}

export type PlainRestriction = Required<RestrictionDocument>
export type MappedRestrictionDocumentCollection = Record<
  string,
  RestrictionDocument
>

export type PlainRestrictionCollection = PlainRestriction[]
export type MappedPlainRestrictionCollection = Record<string, PlainRestriction>

export const restrictionDefaults: PlainRestriction = {
  isForbidden: false,
  notes: '',
  testRequired: false,
  insuranceRequired: false,
  selfIsolation: false,
  origin: 'us',
  destination: 'us',
}
