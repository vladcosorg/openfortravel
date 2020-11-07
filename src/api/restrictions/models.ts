import { getLabelForCountryCode } from 'src/misc/country-list'
import { getFullDescription, getShortDescription } from 'src/models/description'

export enum RestrictionStatus {
  FORBIDDEN = 'forbidden',
  ALLOWED = 'allowed',
  CONDITIONAL = 'conditional',
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
  destination: 'md',
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
    return getLabelForCountryCode(this.origin)
  }

  get destinationLabel(): string {
    return getLabelForCountryCode(this.destination)
  }

  get shortDescription(): string {
    return getShortDescription(this)
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

  public toPlainRestriction(): PlainRestriction {
    return { ...this }
  }
}
