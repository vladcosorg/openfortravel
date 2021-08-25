import { RawCountryFactsheet } from '@/shared/src/models/country-factsheet/raw-country-factsheet'
import { getMappedContinentID } from '@/shared/src/modules/continent-map/continent-map-helpers'
import {
  getDestinationLabelForCountryCode,
  getLabelForCountryCode,
  getOriginLabelForCountryCode,
  transformCountryCodeToDestinationSlug,
  transformCountryCodeToOriginSlug,
} from '@/shared/src/modules/country-list/country-list-helpers'

export type MappedCountryFactsheetCollection = Record<string, CountryFactsheet>
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CountryFactsheet extends RawCountryFactsheet {}
export class CountryFactsheet implements RawCountryFactsheet {
  constructor(plainDestination: RawCountryFactsheet) {
    Object.assign(this, plainDestination)
  }
  get name(): string {
    return getLabelForCountryCode(this.countryCode)
  }

  get originLabel(): string {
    return getOriginLabelForCountryCode(this.countryCode)
  }

  get originNominativeLabel(): string {
    return getLabelForCountryCode(this.countryCode)
  }

  get originSlug(): string {
    return transformCountryCodeToOriginSlug(this.countryCode)
  }

  get continent(): string | undefined {
    return getMappedContinentID(this.countryCode)
  }

  get destinationLabel(): string {
    return getDestinationLabelForCountryCode(this.countryCode)
  }

  get destinationNominativeLabel(): string {
    return getLabelForCountryCode(this.countryCode)
  }

  get destinationSlug(): string {
    return transformCountryCodeToDestinationSlug(this.countryCode)
  }

  public cloneWithFields(
    fields: Partial<RawCountryFactsheet>,
  ): CountryFactsheet {
    return new CountryFactsheet(Object.assign(this.toPlainObject(), fields))
  }

  get linkList(): string[] {
    return this.infoLink.replace(/\r/g, '').split(/\n/).filter(Boolean)
  }

  public toPlainObject(): RawCountryFactsheet {
    return { ...this }
  }

  public equals(instance: CountryFactsheet): boolean {
    return this.countryCode === instance.countryCode
  }

  get percentage(): number {
    if (
      this.thisWeekCasesPer100K !== undefined &&
      this.lastWeekCasesPer100K !== undefined
    ) {
      return (this.thisWeekCasesPer100K * 100) / this.lastWeekCasesPer100K - 100
    }

    return 0
  }

  get fixedPercentage(): string {
    return ` ${
      Math.sign(this.percentage) === 1 ? '+' : ''
    }${this.percentage.toFixed(0)}`
  }

  get thisWeekCasesFixed(): string {
    return this.thisWeekCasesPer100K.toFixed(1)
  }

  get lastWeekCasesFixed(): string {
    return this.lastWeekCasesPer100K.toFixed(1)
  }

  includesSubtring(substring: string): boolean {
    return this.originLabel.toLowerCase().includes(substring)
  }

  substringIndex(substring: string): number {
    return this.originLabel.indexOf(substring)
  }
}
