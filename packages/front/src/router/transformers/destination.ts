import { ParameterTransformer } from '@/front/src/router/transformers/_types'
import {
  transformCountryCodeToDestinationSlug,
  transformDestinationSlugToCode,
} from '@/shared/src/modules/country-list/country-list-helpers'

export const destinationTransformer: ParameterTransformer = {
  encode(input) {
    return transformCountryCodeToDestinationSlug(input)
  },
  decode(input) {
    return transformDestinationSlugToCode(input)
  },
}
