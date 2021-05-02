import difference from 'lodash/difference'

import { getCountryCodes } from '@/shared/src/modules/country-list/country-list-helpers'
import { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

type Options = typeof Origin.defaultOptions

export class Origin extends RestrictionNode<Options> {
  public static defaultOptions = {
    allowedOrigins: [] as string[],
    not: false,
    ...RestrictionNode.defaultOptions,
  }

  protected getDefaults(): Options {
    return Origin.defaultOptions
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
