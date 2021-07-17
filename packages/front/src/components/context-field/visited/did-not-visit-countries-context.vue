<template>
  <country-dropdown
    v-model="model"
    multiple
    label="Recently visited countries"
    clearable
    v-bind="$attrs"
    bottom-slots
  >
    <template #hint>
      <hint>
        Some countries may improse additional restrictions upon you in case
        you've been to a high-risk country recently. Forewarned is forearmed!
      </hint>
    </template>
  </country-dropdown>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import CountryDropdown from '@/front/src/components/context-field/helpers/country-dropdown.vue'
import Hint from '@/front/src/components/context-field/helpers/hint.vue'
import { useModel } from '@/front/src/components/context-field/visited/composables'

export default defineComponent({
  components: { Hint, CountryDropdown },
  inheritAttrs: false,
  props: {},
  setup() {
    const model = useModel()
    return { model }
  },
})
</script>
