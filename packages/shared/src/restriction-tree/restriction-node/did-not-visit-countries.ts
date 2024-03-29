import difference from 'lodash/difference'
import intersection from 'lodash/intersection'

import { getCountryISOCodes } from '@/shared/src/misc/country-codes'
import {
  RestrictionCategory,
  AbstractRestrictionNode,
} from '@/shared/src/restriction-tree/abstract-restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class DidNotVisitCountries extends AbstractRestrictionNode<
  typeof DidNotVisitCountries.defaultOptions
> {
  public static defaultOptions = {
    countryCodes: [] as string[],
    inverseSelection: false,
    matchEmpty: false,
    days: 0,
    ...AbstractRestrictionNode.defaultOptions,
  }

  matches(userVisitedCountries: string[]): boolean {
    if (userVisitedCountries.length === 0) {
      return this.options.matchEmpty
    }

    return intersection(this.getCountries(), userVisitedCountries).length > 0
  }

  displayOrder(): number {
    return -1
  }

  penaltyScore(): number {
    return 1
  }

  category(): RestrictionCategory {
    return RestrictionCategory.PREREQUISITE
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.DID_NOT_VISIT_COUNTRIES
  }

  getCountries(): string[] {
    return this.options.inverseSelection
      ? difference(getCountryISOCodes(), this.options.countryCodes)
      : this.options.countryCodes
  }
}
