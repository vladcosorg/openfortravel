<template>
  <span>
    Travel score:
    <b :class="color">{{ score }}</b> / <b>10</b> <q-icon :name="helpIcon" />
    <q-tooltip>
      The higher the score the less restrictions and requirements you are
      required to abide
    </q-tooltip>
  </span>
</template>

<script lang="ts" setup>
import { matHelp as helpIcon } from '@quasar/extras/material-icons'
import { computed } from 'vue'

const props = defineProps({
  score: {
    type: Number,
    required: true,
  },
})

const color = computed(() => {
  if (props.score >= 7) {
    return 'text-positive'
  }

  if (props.score >= 5) {
    return 'text-warning'
  }

  return 'text-negative'
})
</script>
