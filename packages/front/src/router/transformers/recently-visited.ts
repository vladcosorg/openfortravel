import { ParameterTransformer } from '@/front/src/router/transformers/_types'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

export const recentlyVisitedTransformer: ParameterTransformer<
  VisitorProfile[RestrictionNodeType.DID_NOT_VISIT_COUNTRIES] | undefined
> = {
  matcher(slug) {
    return /visited-/.test(slug)
  },
  encode(input) {
    if (!input || input.length === 0) {
      return
    }

    return `visited-${input.join('-')}`
  },
  decode(input) {
    if (!input) {
      return
    }

    const parts = input.split('visited-').pop()

    if (!parts) {
      return
    }

    return parts.split('-')
  },
  contextField: RestrictionNodeType.DID_NOT_VISIT_COUNTRIES,
}
