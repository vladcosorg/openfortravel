<template>
  <q-item-section>
    <q-item-label class="text-primary bg-elevation-1 q-pa-md">
      <slot name="title" />
    </q-item-label>
    <q-item-label class="text-primary-subtle q-pt-xs text-body2"
      ><slot name="subtitle"
    /></q-item-label>
    <q-item-label caption class="text-primary-subtle"
      ><slot name="reason" />
    </q-item-label>
  </q-item-section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
  },
})
</script>
