<template>
  <q-page
    :class="{
      container: !disableContainer,
      'q-mt-xl': !disableMargins,
    }"
  >
    <h1 v-if="title" class="text-center q-mb-xl">{{ title }}</h1>
    <slot />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: false,
    },
    disableContainer: {
      type: Boolean,
      default: false,
    },
    disableMargins: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
