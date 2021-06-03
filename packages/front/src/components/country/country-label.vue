<template>
  <span :class="{ 'text-bold': !regular, 'text-accent': focused }"
    >{{ prefix }}{{ label }}</span
  >
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import {
  getLabelByDeclination,
  withProps,
} from '@/front/src/components/country/composables'

export default defineComponent({
  inheritAttrs: false,
  props: {
    ...withProps,
    value: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const label = computed(() =>
      props.skipMapping
        ? props.value
        : getLabelByDeclination(props.value, props.declination),
    )
    return { label }
  },
})
</script>
