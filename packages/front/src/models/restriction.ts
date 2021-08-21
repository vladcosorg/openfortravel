import { Destination } from '@/shared/src/api/destinations/models'
import {
  getDestinationLabelForCountryCode,
  getLabelForCountryCode,
  getOriginLabelForCountryCode,
  transformCountryCodeToDestinationSlug,
  transformCountryCodeToOriginSlug,
} from '@/shared/src/modules/country-list/country-list-helpers'
import { getMappedContinentID } from '@/shared/src/modules/continent-map/continent-map-helpers'
import {
  getFullDescription,
  getShortDescription,
} from '@/front/src/models/content'
import {
  PlainRestriction,
  RestrictionStatus,
} from '@/shared/src/api/restrictions/models'

export class Restriction implements PlainRestriction {
  public readonly origin!: string
  public readonly destination!: string
  public readonly notes = ''
  public readonly testRequired = false
  public readonly insuranceRequired = false
  public readonly selfIsolation = false
  public readonly isForbidden = false

  constructor(
    document: PlainRestriction,
    public readonly country: Destination,
  ) {
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

export type RestrictionCollection = Restriction[]
export type MappedRestrictionCollection = Record<string, Restriction>
