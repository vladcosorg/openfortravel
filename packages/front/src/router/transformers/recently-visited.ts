import { ParameterTransformer } from '@/front/src/router/transformers/_types'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import {
  transformCountryCodeToOriginSlug,
  transformOriginSlugToCode,
} from '@/shared/src/modules/country-list/country-list-helpers'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

export const recentlyVisitedTransformer: ParameterTransformer<
  VisitorProfile[RestrictionNodeType.DID_NOT_VISIT_COUNTRIES] | undefined
> = {
  encode(input) {
    if (!input) {
      input =
        useRootStore().state.visitorContext[
          RestrictionNodeType.DID_NOT_VISIT_COUNTRIES
        ]
    }

    if (!input) {
      return
    }

    return `recently-visited-${input
      .map((countryIso) => transformCountryCodeToOriginSlug(countryIso))
      .join('--and--')}`
  },
  decode(input) {
    if (!input) {
      return
    }

    const parts = input.split('recently-visited-').pop()

    if (!parts) {
      return
    }

    return parts.split('--and--').map((slug) => transformOriginSlugToCode(slug))
  },
  contextField: RestrictionNodeType.DID_NOT_VISIT_COUNTRIES,
}
