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
import { defineComponent, PropType } from '@vue/composition-api'

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props) {
    const insertSeparator = (index): string => {
      if (index === 0) {
        return ''
      }

      if (index === props.items.length - 1) {
        return ' and'
      }

      return ','
    }

    return { insertSeparator }
  },
})
</script>
