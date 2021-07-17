<template>
  <q-item-label>{{ text }}</q-item-label>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  components: {},
  props: {
    score: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const words = [
      'Very inconvenient',
      'Somewhat inconvenient',
      'Acceptable',
      'Convenient',
      'Time-saver!',
    ]
    return {
      text: computed(() => words[props.score - 1]),
    }
  },
})
</script>
