<template>
  <span :class="{ 'text-bold': !regular }">{{ label }}</span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'

import {
  VaccineBrand,
  vaccineLabels,
} from '@/shared/src/restriction-tree/restriction-node/vaccinated'

export default defineComponent({
  inheritAttrs: false,
  props: {
    regular: {
      type: Boolean,
    },
    value: {
      type: String as PropType<VaccineBrand>,
      required: true,
    },
  },
  setup(props) {
    const label = computed(() => vaccineLabels[props.value])
    return { label }
  },
})
</script>
