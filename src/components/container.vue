<template>
  <q-layout view="hhr lpr ffr">
    <q-page-container
      :class="[
        $style.container,
        fullheight ? 'window-height' : '',
        'column',
        'justify-between',
      ]"
    >
      <slot />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" module>
.container {
  background-color: #222930;
  color: white;
}
</style>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    fullheight: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    return {}
  },
})
</script>
