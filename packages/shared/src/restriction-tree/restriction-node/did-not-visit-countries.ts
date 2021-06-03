import difference from 'lodash/difference'
import intersection from 'lodash/intersection'

import { getCountryCodes } from '@/shared/src/modules/country-list/country-list-helpers'
import {
  RestrictionCategory,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class DidNotVisitCountries extends RestrictionNode<
  typeof DidNotVisitCountries.defaultOptions
> {
  public static defaultOptions = {
    countryCodes: [] as string[],
    inverseSelection: false,
    exclude: true,
    days: 0,
    ...RestrictionNode.defaultOptions,
  }

  matches(userVisitedCountries: string[]): boolean {
    if (userVisitedCountries.length === 0) {
      return this.options.exclude
    }

    const noMatches =
      intersection(this.getCountries(), userVisitedCountries).length === 0

    if (noMatches) {
      return this.options.exclude
    }

    return !this.options.exclude
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

  protected getCountries(): string[] {
    return this.options.inverseSelection
      ? difference(getCountryCodes(), this.options.countryCodes)
      : this.options.countryCodes
  }
}
