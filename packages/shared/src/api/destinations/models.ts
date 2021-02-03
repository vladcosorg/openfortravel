import type firebase from 'firebase/app'

import { getLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'

export enum RiskLevel {
  NO_DATA = 'no-data',
  LOW = 'low',
  MODERATE = 'moderate',
  HIGH = 'high',
  VERY_HIGH = 'very-high',
}

export interface DestinationDocument {
  infoLink?: string
  bestByDate?: string
  lastUpdated?: firebase.firestore.Timestamp
  isHealthDeclarationRequired?: boolean
  healthDeclarationDocURL?: string
  riskLevel: RiskLevel
  internalInfo?: string
  testOnArrival?: false
  testValidityInHours?: number
  proofOfRecoveryInDays?: number
}

export interface PlainDestination extends DestinationDocument {
  countryCode: string
}

export class DestinationDefaults implements PlainDestination {
  public readonly countryCode = 'us'
  public readonly infoLink = ''
  public readonly bestByDate = ''
  public readonly isHealthDeclarationRequired = false
  public readonly healthDeclarationDocURL = ''
  public readonly riskLevel = RiskLevel.NO_DATA
  public readonly testValidityInHours = 48
  public readonly selfIsolationInDays = 14
  public readonly testOnArrival = false
  public readonly proofOfRecoveryInDays = 0

  get name(): string {
    return getLabelForCountryCode(this.countryCode)
  }

  public toPlainObject(): PlainDestination {
    return { ...this }
  }

  public cloneWithFields(fields: Partial<PlainDestination>): Destination {
    return new Destination(Object.assign(this.toPlainObject(), fields))
  }
}

export class Destination extends DestinationDefaults {
  constructor(document: PlainDestination) {
    super()
    Object.assign(this, document)
  }
}
