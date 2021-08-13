import {
  transformCountryCodeToOriginSlug,
  transformOriginSlugToCode,
} from '@/shared/src/modules/country-list/country-list-helpers'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

import { getCurrentOriginSlug } from '@/front/src/misc/country-decider'
import { ParameterTransformer } from '@/front/src/router/transformers/_types'

export const originTransformer: ParameterTransformer<string | undefined> = {
  encode(input) {
    return input
      ? transformCountryCodeToOriginSlug(input)
      : getCurrentOriginSlug()
  },
  decode(input) {
    return transformOriginSlugToCode(input)
  },
  contextField: RestrictionNodeType.ORIGIN,
}
