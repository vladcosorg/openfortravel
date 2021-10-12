<template>
  <q-btn
    v-bind="$attrs"
    type="submit"
    unelevated
    size="lg"
    color="accent"
    class="text-bold"
    text-color="primary-inverse"
    :icon-right="isSuccessful ? matDone : undefined"
    :loading="isLoading"
    :disable="isLoading || isSuccessful"
    :label="isSuccessful && successLabel ? successLabel : label"
  />
</template>

<script lang="ts">
import { matDone } from '@quasar/extras/material-icons'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  inheritAttrs: false,
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    isSuccessful: { type: Boolean, default: false },
    label: {
      type: String,
      required: true,
    },
    successLabel: {
      type: String,
    },
  },
  setup() {
    return { matDone }
  },
})
</script>
