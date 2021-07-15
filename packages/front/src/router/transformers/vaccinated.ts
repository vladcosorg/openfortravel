import { ParameterTransformer } from '@/front/src/router/transformers/_types'
import { isVaccineBrand } from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

export const vaccinatedTransformer: ParameterTransformer<
  VisitorProfile[RestrictionNodeType.VACCINATED]
> = {
  encode(input) {
    if (!input) {
      return 'not-vaccinated'
    }

    return `vaccinated-with-${input.brand}`
  },
  decode(input) {
    if (!input || input === 'not-vaccinated') {
      return
    }

    const type = input.split('vaccinated-with-').pop()

    if (!type) {
      return
    }

    if (!isVaccineBrand(type)) {
      return
    }

    return {
      partial: false,
      brand: type,
    }
  },
  contextField: RestrictionNodeType.VACCINATED,
}
