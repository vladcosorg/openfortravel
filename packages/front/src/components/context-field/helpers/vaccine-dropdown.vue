<template>
  <generic-select
    :value="value === undefined ? false : value"
    :options="list"
    v-bind="$attrs"
    :inline="inline"
    @input="$emit('input', $event === false ? undefined : $event)"
  >
    <template v-for="(_, slot) of $scopedSlots" #[slot]="scope"
      ><slot :name="slot" v-bind="scope"
    /></template>

    <template #selected>
      <vaccine-label regular :capitalize="!inline" :value="value" />
    </template>
  </generic-select>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import GenericSelect from '@/front/src/components/context-field/helpers/generic-select.vue'
import VaccineLabel from '@/front/src/components/vaccine-label.vue'
import { transformFlatMapToArrayOfPairs } from '@/shared/src/misc/misc'
import {
  getVaccineLabel,
  vaccineLabels,
} from '@/shared/src/restriction-tree/restriction-node/vaccinated'

export default defineComponent({
  components: { VaccineLabel, GenericSelect },
  inheritAttrs: false,
  props: {
    inline: {
      type: Boolean,
    },
    value: {
      type: [String, Array, Boolean],
    },
  },
  setup() {
    const list = computed(() => [
      { label: getVaccineLabel(), value: false },
      ...transformFlatMapToArrayOfPairs(vaccineLabels),
    ])
    return {
      list,
    }
  },
})
</script>
