<template>
  <q-item-label>{{ text }}</q-item-label>
</template>

<style lang="scss" module></style>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

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
