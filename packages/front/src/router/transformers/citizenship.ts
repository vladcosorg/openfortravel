import { ParameterTransformer } from '@/front/src/router/transformers/_types'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import {
  transformCountryCodeToOriginSlug,
  transformOriginSlugToCode,
} from '@/shared/src/modules/country-list/country-list-helpers'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

export const citizenshipTransformer: ParameterTransformer<
  VisitorProfile[RestrictionNodeType.CITIZENSHIP] | undefined
> = {
  encode(input) {
    if (!input) {
      input = [
        useRootStore().getters.visitorContextWithDefaults[
          RestrictionNodeType.ORIGIN
        ],
      ]
    }

    return `citizen-of-${input
      .map((countryIso) => transformCountryCodeToOriginSlug(countryIso))
      .join('--and--')}`
  },
  decode(input) {
    if (!input) {
      return
    }

    const parts = input.split('citizen-of-').pop()
    if (!parts) {
      return
    }

    const isoList = parts
      .split('--and--')
      .map((slug) => transformOriginSlugToCode(slug))

    if (
      isoList.length === 1 &&
      isoList[0] ===
        useRootStore().getters.visitorContextWithDefaults[
          RestrictionNodeType.ORIGIN
        ]
    ) {
      return
    }

    return isoList
  },
  contextField: RestrictionNodeType.CITIZENSHIP,
  matcher(slug) {
    return /citizen-of/.test(slug)
  },
}
