<template>
  <span :class="{ 'text-bold': !regular }">{{ label }}</span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

import {
  testLabels,
  TestType,
} from '@/shared/src/restriction-tree/restriction-node/pcr-test'

export default defineComponent({
  inheritAttrs: false,
  props: {
    regular: {
      type: Boolean,
    },
    value: {
      type: String as PropType<TestType>,
      required: true,
    },
  },
  setup(props) {
    const label = computed(() => testLabels[props.value])
    return { label }
  },
})
</script>
