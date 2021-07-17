<template>
  <generic-select :model-value="value" :options="list" v-bind="$attrs">
    <template v-for="(_, slot) of $slots" #[slot]="scope"
      ><slot :name="slot" v-bind="scope"
    /></template>
  </generic-select>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import GenericSelect from '@/front/src/components/context-field/helpers/generic-select.vue'
import { transformFlatMapToArrayOfPairs } from '@/shared/src/misc/misc'
import { getOriginLabels } from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  components: { GenericSelect },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Array],
    },
  },
  setup() {
    const list = computed(() =>
      transformFlatMapToArrayOfPairs(getOriginLabels()),
    )
    return {
      list,
    }
  },
})
</script>
