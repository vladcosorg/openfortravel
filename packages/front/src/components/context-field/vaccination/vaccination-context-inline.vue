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
import { defineComponent } from 'vue'

import VaccineDropdown from '@/front/src/components/context-field/helpers/vaccine-dropdown.vue'
import { useModel } from '@/front/src/components/context-field/vaccination/composables'

export default defineComponent({
  components: { VaccineDropdown },
  inheritAttrs: false,
  setup() {
    const value = useModel()
    return {
      value,
    }
  },
})
</script>
