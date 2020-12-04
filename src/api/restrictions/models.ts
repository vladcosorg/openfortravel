import { getFullDescription, getShortDescription } from 'src/models/description'
import {
  getDestinationLabelForCountryCode,
  getLabelForCountryCode,
  getOriginLabelForCountryCode,
  transformCodeToDestinationSlug,
  transformCodeToOriginSlug,
} from 'src/modules/country-list/country-list-helpers'

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
  selfIsolation?: number
  origin?: string
  destination?: string
}

export type PlainRestriction = Required<RestrictionDocument>

export const restrictionDefaults: PlainRestriction = {
  isForbidden: false,
  notes: '',
  testRequired: false,
  insuranceRequired: false,
  selfIsolation: 0,
  origin: 'us',
  destination: 'us',
}

export class Restriction implements PlainRestriction {
  public readonly origin!: string
  public readonly destination!: string
  public readonly notes = ''
  public readonly testRequired = false
  public readonly insuranceRequired = false
  public readonly selfIsolation = 0
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
    return transformCodeToOriginSlug(this.origin)
  }

  get destinationLabel(): string {
    return getDestinationLabelForCountryCode(this.destination)
  }

  get destinationNominativeLabel(): string {
    return getLabelForCountryCode(this.destination)
  }

  get destinationSlug(): string {
    return transformCodeToDestinationSlug(this.destination)
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

    if (this.selfIsolation > 0) {
      return RestrictionStatus.CONDITIONAL
    }

    return RestrictionStatus.ALLOWED
  }

  public isAllowed(): boolean {
    return RestrictionStatus.ALLOWED === this.status
  }

  public needsSelfIsolation(): boolean {
    return this.selfIsolation > 0
  }

  public toPlainRestriction(): PlainRestriction {
    return { ...this }
  }
}
