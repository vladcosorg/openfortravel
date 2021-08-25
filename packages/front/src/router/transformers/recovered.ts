import toInteger from 'lodash/toInteger'

import { ParameterTransformer } from '@/front/src/router/transformers/_types'
import { ProfileContext } from '@/shared/src/models/profile-context/profile-context'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export const recoveredTransformer: ParameterTransformer<
  ProfileContext[RestrictionNodeType.RECOVERY]
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
