<template>
  <generic-select
    label="Vaccination status"
    :value="value === undefined ? false : value"
    :options="list"
    v-bind="$attrs"
    @input="$emit('input', $event === false ? undefined : $event)"
  >
    <template v-for="(_, slot) of $scopedSlots" #[slot]="scope"
      ><slot :name="slot" v-bind="scope"
    /></template>
  </generic-select>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import GenericSelect from '@/front/src/components/context-field/helpers/generic-select.vue'
import { transformFlatMapToArrayOfPairs } from '@/shared/src/misc/misc'
import { vaccineLabels } from '@/shared/src/restriction-tree/restriction-node/vaccinated'

export default defineComponent({
  components: { GenericSelect },
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Array, Boolean],
    },
  },
  setup() {
    const list = computed(() => [
      { label: 'Not vaccinated', value: false },
      ...transformFlatMapToArrayOfPairs(vaccineLabels),
    ])
    return {
      list,
    }
  },
})
</script>
