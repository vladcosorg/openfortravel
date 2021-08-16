import difference from 'lodash/difference'

import { getCountryCodes } from '@/shared/src/modules/country-list/country-list-helpers'
import { AbstractRestrictionNode } from '@/shared/src/restriction-tree/abstract-restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class Origin extends AbstractRestrictionNode<
  typeof Origin.defaultOptions
> {
  public static defaultOptions = {
    allowedOrigins: [] as string[],
    not: false,
    ...AbstractRestrictionNode.defaultOptions,
  }

  matches(value: string): boolean {
    return this.getAllowedCountries().includes(value)
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.ORIGIN
  }

  public getAllowedCountries(): string[] {
    return this.options.not
      ? difference(getCountryCodes(), this.options.allowedOrigins)
      : this.options.allowedOrigins
  }
}
