<template>
  Travel score:
  <b class="text-positive">{{ score }}</b> out of <b>10</b>
</template>

<script lang="ts">
import { matGrade as icon } from '@quasar/extras/material-icons'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    score: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const color = computed(
      () =>
        ['red-8', 'red-5', 'light-green-6', 'light-green-8', 'green-8'][
          props.score - 1
        ],
    )
    return {
      color,
      icon,
    }
  },
})
</script>
