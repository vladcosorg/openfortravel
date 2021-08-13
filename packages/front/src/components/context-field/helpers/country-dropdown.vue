<template>
  <generic-select :model-value="modelValue" :options="list" v-bind="$attrs">
    <template v-if="$slots.selected" #selected>
      <slot name="selected" />
    </template>
  </generic-select>
</template>

<script lang="ts">
import { transformFlatMapToArrayOfPairs } from '@/shared/src/misc/misc'
import { getOriginLabels } from '@/shared/src/modules/country-list/country-list-helpers'
import { computed, defineComponent } from 'vue'

import GenericSelect from '@/front/src/components/context-field/helpers/generic-select.vue'

export default defineComponent({
  components: { GenericSelect },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Array],
    },
  },
  setup(props) {
    const list = computed(() =>
      transformFlatMapToArrayOfPairs(getOriginLabels()),
    )
    return {
      list,
    }
  },
})
</script>
