import { computed, ComputedRef } from 'vue'

import { transformFlatMapToArrayOfPairs } from '@/shared/src/misc/misc'
import { OptionList } from '@/shared/src/misc/type-helpers'
import {
  getVaccineLabel,
  vaccineLabels,
} from '@/shared/src/restriction-tree/restriction-node/vaccinated'

export function useVaccinationOptions(): ComputedRef<
  OptionList<string | boolean>
> {
  return computed(() => [
    { label: getVaccineLabel(), value: false },
    ...transformFlatMapToArrayOfPairs(vaccineLabels),
  ])
}
