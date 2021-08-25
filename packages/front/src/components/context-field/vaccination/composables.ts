import { computed, ref } from 'vue'

import { updateRouteParameter } from '@/front/src/router/route-builders/common'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { VaccineBrand } from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export function useModel() {
  const store = useRootStore()
  const buffer = ref()
  const isSaving = computed(() => buffer.value !== undefined)
  const model = computed({
    get() {
      return buffer.value === undefined
        ? store.getters.visitorContextWithDefaults[
            RestrictionNodeType.VACCINATED
          ]?.brand ?? false
        : buffer.value
    },
    set(value: false | VaccineBrand) {
      buffer.value = value
      setTimeout(() => {
        updateRouteParameter(
          RestrictionNodeType.VACCINATED,
          value === false
            ? undefined
            : {
                partial: false,
                brand: value,
              },
        )
        buffer.value = undefined
      }, 400)
    },
  })
  return { model, isSaving }
}
