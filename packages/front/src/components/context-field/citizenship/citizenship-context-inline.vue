<template>
  <country-dropdown
    v-model="value"
    borderless
    behavior="dialog"
    inherit-font-size
    multiple
    inline
    no-ellipsis
    dense
  >
    <template #selected>
      <country-label-list regular :values="value" />
    </template>
  </country-dropdown>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { useModel } from '@/front/src/components/context-field/citizenship/composables'
import CountryDropdown from '@/front/src/components/context-field/helpers/country-dropdown.vue'
import CountryLabelList from '@/front/src/components/country/country-label-list.vue'

export default defineComponent({
  components: {
    CountryLabelList,
    CountryDropdown,
  },
  inheritAttrs: false,
  setup() {
    const value = useModel()
    return { value }
  },
})
</script>
