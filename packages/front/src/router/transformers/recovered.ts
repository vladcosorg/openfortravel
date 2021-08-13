import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'
import toInteger from 'lodash/toInteger'

import { ParameterTransformer } from '@/front/src/router/transformers/_types'

export const recoveredTransformer: ParameterTransformer<
  VisitorProfile[RestrictionNodeType.RECOVERY]
> = {
  matcher(slug) {
    return /with-covid-recovery/.test(slug)
  },
  encode(input) {
    if (!input) {
      return
    }

    return `with-covid-recovery-certificate-${input}`
  },
  decode(input) {
    if (!input) {
      return
    }

    const days = input.split('with-covid-recovery-certificate-').pop()
    return toInteger(days)
  },
  contextField: RestrictionNodeType.RECOVERY,
}
