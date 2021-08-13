<template>
  <span>
    <language v-for="(code, index) in codes" :key="code" :code="code">
      <template v-if="index === 0" #prefix />
      <template v-else-if="index < codes.length - 1" #prefix> , </template>
      <template v-else #prefix> or </template>
    </language>
  </span>
</template>

<script lang="ts">
import { useRootStore } from '@/shared/src/composables/use-plugins'
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'

import Language from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/language.vue'

export default defineComponent({
  components: { Language },
  props: {
    codes: {
      type: Array as PropType<string[]>,
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
