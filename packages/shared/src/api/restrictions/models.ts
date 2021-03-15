import { getFullDescription, getShortDescription } from '@/front/src/models/content'
import { getMappedContinentID } from '@/shared/src/modules/continent-map/continent-map-helpers'
import {
  getDestinationLabelForCountryCode,
  getLabelForCountryCode,
  getOriginLabelForCountryCode,
  transformCountryCodeToDestinationSlug,
  transformCountryCodeToOriginSlug,
} from '@/shared/src/modules/country-list/country-list-helpers'

export enum RestrictionStatus {
  ALLOWED = 'allowed',
  ALLOWED_SOON = 'allowed_soon',
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
export type MappedRestrictionDocumentCollection = Record<string, RestrictionDocument>

export type PlainRestrictionCollection = PlainRestriction[]
export type MappedPlainRestrictionCollection = Record<string, PlainRestriction>

export type RestrictionCollection = Restriction[]
export type MappedRestrictionCollection = Record<string, Restriction>

export const restrictionDefaults: PlainRestriction = {
  isForbidden: false,
  notes: '',
  testRequired: false,
  insuranceRequired: false,
  selfIsolation: false,
  origin: 'us',
  destination: 'us',
}

export class Restriction implements PlainRestriction {
  public readonly origin!: string
  public readonly destination!: string
  public readonly notes = ''
  public readonly testRequired = false
  public readonly insuranceRequired = false
  public readonly selfIsolation = false
  public readonly isForbidden = false
  constructor(document: PlainRestriction) {
    Object.assign(this, document)
  }

  get originLabel(): string {
    return getOriginLabelForCountryCode(this.origin)
  }

  get originNominativeLabel(): string {
    return getLabelForCountryCode(this.origin)
  }

  get originSlug(): string {
    return transformCountryCodeToOriginSlug(this.origin)
  }

  get originContinent(): string | undefined {
    return getMappedContinentID(this.origin)
  }

  get destinationContinent(): string | undefined {
    return getMappedContinentID(this.destination)
  }

  get destinationLabel(): string {
    return getDestinationLabelForCountryCode(this.destination)
  }

  get destinationNominativeLabel(): string {
    return getLabelForCountryCode(this.destination)
  }

  get destinationSlug(): string {
    return transformCountryCodeToDestinationSlug(this.destination)
  }

  get shortDescription(): string {
    return getShortDescription(this)
  }

  get returnShortDescription(): string {
    return getShortDescription(this, true)
  }

  get description(): string {
    return getFullDescription(this)
  }

  get status(): RestrictionStatus {
    if (this.isForbidden) {
      return RestrictionStatus.FORBIDDEN
    }

    if (this.selfIsolation) {
      return RestrictionStatus.CONDITIONAL
    }

    return RestrictionStatus.ALLOWED
  }

  public isAllowed(): boolean {
    return RestrictionStatus.ALLOWED === this.status
  }

  public needsSelfIsolation(): boolean {
    return this.selfIsolation
  }

  public toPlainRestriction(): PlainRestriction {
    return { ...this }
  }
}
