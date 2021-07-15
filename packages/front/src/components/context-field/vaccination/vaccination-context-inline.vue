<template>
  <vaccine-dropdown
    v-model="value"
    inline
    no-ellipsis
    dense
    borderless
    behavior="dialog"
    inherit-font-size
  />
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import VaccineDropdown from '@/front/src/components/context-field/helpers/vaccine-dropdown.vue'
import { updateRouteParameter } from '@/front/src/router/route-builders/common'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { VaccineBrand } from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: { VaccineDropdown },
  inheritAttrs: false,
  setup() {
    const store = useRootStore()
    return {
      value: computed({
        get() {
          return store.state.visitorContext[RestrictionNodeType.VACCINATED]
            ?.brand
        },
        set(value: undefined | VaccineBrand) {
          updateRouteParameter(
            RestrictionNodeType.VACCINATED,
            value === undefined
              ? undefined
              : {
                  partial: false,
                  brand: value,
                },
          )
        },
      }),
    }
  },
})
</script>
