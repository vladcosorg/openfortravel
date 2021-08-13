<template>
  <span>
    <span v-if="!noPrefix && value" style="font-weight: normal">
      vaccinated with
    </span>
    <span :class="{ 'text-bold': !regular, 'text-capitalize': capitalize }">
      {{ label }}
    </span>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

import {
  getVaccineLabel,
  VaccineBrand,
} from '@/shared/src/restriction-tree/restriction-node/vaccinated'

export default defineComponent({
  inheritAttrs: false,
  props: {
    regular: {
      type: Boolean,
    },
    value: {
      type: String as PropType<VaccineBrand>,
      required: false,
    },
    noPrefix: {
      type: Boolean,
    },
    capitalize: {
      type: Boolean,
    },
  },
  setup(props) {
    const label = computed(() => getVaccineLabel(props.value))
    return { label }
  },
})
</script>
