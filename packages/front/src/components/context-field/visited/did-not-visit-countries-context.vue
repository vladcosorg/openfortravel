<template>
  <generic-select
    v-model="model"
    multiple
    label="Recently visited countries"
    clearable
    v-bind="$attrs"
    bottom-slots
    :options="options"
  >
    <template #hint>
      <hint>
        Some countries may improse additional restrictions upon you in case
        you've been to a high-risk country recently. Forewarned is forearmed!
      </hint>
    </template>
  </generic-select>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import GenericSelect from '@/front/src/components/context-field/helpers/generic-select.vue'
import Hint from '@/front/src/components/context-field/helpers/hint.vue'
import { useModel } from '@/front/src/components/context-field/visited/composables'
import { useCountryOptions } from '@/front/src/composables/misc'

export default defineComponent({
  components: { GenericSelect, Hint },
  inheritAttrs: false,
  props: {},
  setup() {
    const options = useCountryOptions()
    const model = useModel()
    return { model, options }
  },
})
</script>
