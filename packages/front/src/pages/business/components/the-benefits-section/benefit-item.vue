<template>
  <div class="q-gutter-y-md">
    <div class="text-center">
      <q-avatar color="elevation-1" size="10rem" text-color="primary">
        <slot name="icon" />
      </q-avatar>
    </div>
    <div>
      <h5 class="text-capitalize text-center"><slot name="title" /></h5>
      <div class="text-subtitle1 text-primary-subtle">
        <slot name="subtitle" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
