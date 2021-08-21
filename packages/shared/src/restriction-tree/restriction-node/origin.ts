import difference from 'lodash/difference'

import { getCountryISOCodes } from '@/shared/src/misc/country-codes'
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
      ? difference(getCountryISOCodes(), this.options.allowedOrigins)
      : this.options.allowedOrigins
  }
}
