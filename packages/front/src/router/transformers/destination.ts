import {
  transformCountryCodeToDestinationSlug,
  transformDestinationSlugToCode,
} from '@/shared/src/modules/country-list/country-list-helpers'

import { ParameterTransformer } from '@/front/src/router/transformers/_types'

export const destinationTransformer: ParameterTransformer = {
  encode(input) {
    if (!input) {
      throw new Error('Missing mandatory parameter')
    }

    return transformCountryCodeToDestinationSlug(input)
  },
  decode(input) {
    if (!input) {
      throw new Error('Missing mandatory parameter')
    }

    return transformDestinationSlugToCode(input)
  },
  isRequired: true,
}
