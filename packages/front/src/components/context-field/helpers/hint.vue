<template>
  <div class="text-primary-subtle">
    <q-icon :name="infoIcon" size="xs" /> Why do I need to provide this info?
    <q-tooltip><slot name="default" /> </q-tooltip>
  </div>
</template>

<script lang="ts">
import { ionHelpCircleOutline as infoIcon } from '@quasar/extras/ionicons-v5'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return { infoIcon }
  },
})
</script>
