import toInteger from 'lodash/toInteger'

import { ParameterTransformer } from '@/front/src/router/transformers/_types'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

export const recoveredTransformer: ParameterTransformer<
  VisitorProfile[RestrictionNodeType.RECOVERY]
> = {
  encode(input) {
    if (!input) {
      return 'no-covid-recovery-certificate'
    }

    return `with-covid-recovery-certificate-${input}`
  },
  decode(input) {
    if (!input) {
      return this.getDefault()
    }

    if (input === 'no-covid-recovery-certificate') {
      return
    }
    const days = input.split('with-covid-recovery-certificate-').pop()
    return toInteger(days)
  },
  getDefault(): undefined {
    return undefined
  },
  contextField: RestrictionNodeType.RECOVERY,
}
