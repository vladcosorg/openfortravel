import difference from 'lodash/difference'

import { getCountryCodes } from '@/shared/src/modules/country-list/country-list-helpers'
import { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class Origin extends RestrictionNode<typeof Origin.defaultOptions> {
  public static defaultOptions = {
    allowedOrigins: [] as string[],
    not: false,
    ...RestrictionNode.defaultOptions,
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
