import { PlainOrigin } from 'src/api/Origin'
import {
  getFlagForCountryCode,
  getLabelForCountryCode,
} from 'src/misc/I18nCountryList'

export class Origin implements PlainOrigin {
  public readonly countryCode!: string
  public readonly reference = ''
  constructor(protected document: PlainOrigin) {
    Object.assign(this, document)
  }

  get countryLabel(): string {
    return getLabelForCountryCode(this.countryCode)
  }

  get countryFlag(): string {
    return getFlagForCountryCode(this.countryCode)
  }
}
