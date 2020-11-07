import { getLabelForCountryCode } from 'src/misc/country-list'

export interface DestinationDocument {
  infoLink?: string
  bestByDate?: string
  isHealthDeclarationRequired?: boolean
  healthDeclarationDocURL?: string
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
