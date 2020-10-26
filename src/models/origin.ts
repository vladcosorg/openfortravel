import { PlainOrigin } from 'src/api/origin'
import { getLabelForCountryCode } from 'src/misc/i18n-country-list'

export class Origin implements PlainOrigin {
  public readonly countryCode!: string
  public readonly reference = ''
  public readonly bestByDate!: string

  constructor(protected document: PlainOrigin) {
    Object.assign(this, document)
  }

  get countryLabel(): string {
    return getLabelForCountryCode(this.countryCode)
  }
}
