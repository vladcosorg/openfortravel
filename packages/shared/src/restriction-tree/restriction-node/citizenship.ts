import difference from 'lodash/difference'

import { getCountryCodes } from '@/shared/src/modules/country-list/country-list-helpers'
import {
  RestrictionCategory,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class Citizenship extends RestrictionNode<
  typeof Citizenship.defaultOptions
> {
  public static defaultOptions = {
    allowedCitizenship: [] as string[],
    not: false,
    ...RestrictionNode.defaultOptions,
  }
  matches(value: string): boolean {
    return this.getAllowedCountries().includes(value)
  }

  category(): RestrictionCategory {
    return RestrictionCategory.PREREQUISITE
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.CITIZENSHIP
  }

  public getAllowedCountries(): string[] {
    return this.options.not
      ? difference(getCountryCodes(), this.options.allowedCitizenship)
      : this.options.allowedCitizenship
  }
}
