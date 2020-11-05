import { getLabelForCountryCode } from 'src/misc/country-list'
import { getFullDescription, getShortDescription } from 'src/models/description'

export enum RestrictionStatus {
  FORBIDDEN = 'forbidden',
  ALLOWED = 'allowed',
  CONDITIONAL = 'conditional',
}

export interface RestrictionDocument {
  notes?: string
  status?: RestrictionStatus
  testRequired?: boolean
  insuranceRequired?: boolean
  selfIsolation?: number
  origin?: string
  destination?: string
}

export type PlainRestriction = Required<RestrictionDocument>

export const restrictionDefaults: PlainRestriction = {
  notes: '',
  status: RestrictionStatus.ALLOWED,
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
  public readonly status = RestrictionStatus.ALLOWED
  public readonly testRequired = false
  public readonly isDummy = true
  public readonly insuranceRequired = false
  public readonly selfIsolation = 0
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

  public toPlainRestriction(): PlainRestriction {
    return { ...this }
  }
}
