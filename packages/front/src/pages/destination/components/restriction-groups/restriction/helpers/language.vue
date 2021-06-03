<template>
  <span>
    <slot name="prefix" />
    <b>{{ label }}</b>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import { useRootStore } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  components: {},
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const label = computed(
      () => useRootStore().state.localizedLanguages[props.code] ?? props.code,
    )
    return { label }
  },
})
</script>
