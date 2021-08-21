import difference from 'lodash/difference'
import intersection from 'lodash/intersection'

import { getCountryISOCodes } from '@/shared/src/misc/country-codes'
import {
  RestrictionCategory,
  AbstractRestrictionNode,
} from '@/shared/src/restriction-tree/abstract-restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class Citizenship extends AbstractRestrictionNode<
  typeof Citizenship.defaultOptions
> {
  public static defaultOptions = {
    allowedCitizenship: [] as string[],
    not: false,
    ...AbstractRestrictionNode.defaultOptions,
  }

  matches(citizenships: string[]): boolean {
    return this.getAllowedCountries().some((allowedCitizenship) =>
      citizenships.includes(allowedCitizenship),
    )
  }

  category(): RestrictionCategory {
    return RestrictionCategory.PREREQUISITE
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.CITIZENSHIP
  }

  public getAllowedCountries(): string[] {
    return this.options.not
      ? difference(getCountryISOCodes(), this.options.allowedCitizenship)
      : this.options.allowedCitizenship
  }

  public getMatchingAllowedCountries(citizenships: string[]): string[] {
    return intersection(this.getAllowedCountries(), citizenships)
  }
}
