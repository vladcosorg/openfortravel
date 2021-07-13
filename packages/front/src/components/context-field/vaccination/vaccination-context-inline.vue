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

import Hint from '@/front/src/components/context-field/helpers/hint.vue'
import VaccineDropdown from '@/front/src/components/context-field/helpers/vaccine-dropdown.vue'
import { createComputedSetter } from '@/front/src/pages/guide/guide-composable'
import { VaccineBrand } from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: { Hint, VaccineDropdown },
  inheritAttrs: false,
  props: {
    inline: {
      type: Boolean,
    },
  },
  setup() {
    const setter = createComputedSetter(RestrictionNodeType.VACCINATED)
    return {
      value: computed({
        get() {
          return setter.value === undefined ? undefined : setter.value.brand
        },
        set(value: undefined | VaccineBrand) {
          setter.value =
            value === undefined
              ? undefined
              : {
                  partial: false,
                  brand: value,
                }
        },
      }),
    }
  },
})
</script>
