<template>
  <span
    ><template v-for="(item, index) in items"
      >{{ insertSeparator(index) }}
      <slot :item="item">
        {{ item }}
      </slot>
    </template></span
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import type { PropType } from 'vue'

export default defineComponent({
  props: {
    conjunction: {
      type: String,
      default: 'and',
    },
    items: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props) {
    const insertSeparator = (index: number): string => {
      if (index === 0) {
        return ''
      }

      if (index === props.items.length - 1) {
        return ' ' + props.conjunction
      }

      return ','
    }

    return { insertSeparator }
  },
})
</script>
