import { ParameterTransformer } from '@/front/src/router/transformers/_types'
import { ProfileContext } from '@/shared/src/models/profile-context/profile-context'
import { isVaccineBrand } from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export const vaccinatedTransformer: ParameterTransformer<
  ProfileContext[RestrictionNodeType.VACCINATED]
> = {
  matcher(slug) {
    return /(unvaccinated|vaccinated-with)/.test(slug)
  },
  encode(input) {
    if (!input) {
      return 'unvaccinated'
    }

    return `vaccinated-with-${input.brand}`
  },
  decode(input) {
    if (!input || input === 'unvaccinated') {
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
