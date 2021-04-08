import intersection from 'lodash/intersection'

import { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class DidNotVisitCountries extends RestrictionNode {
  constructor(protected readonly options: { countryCodes: string[]; days: number }) {
    super()
  }

  matches(userVisitedCountries: string[]): boolean {
    if (userVisitedCountries.length === 0) {
      return true
    }

    return intersection(this.options.countryCodes, userVisitedCountries).length === 0
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.DID_NOT_VISIT_COUNTRIES
  }
}
