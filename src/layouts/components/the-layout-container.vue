<template>
  <q-page-container
    style="overflow-x: hidden"
    :class="[
      $style.container,
      'column',
      'justify-between',
      $q.platform.is.safari && fullheight ? $style['mobile-safari-fix'] : '',
      {
        'window-height': fullheight,
      },
    ]"
  >
    <slot />
  </q-page-container>
</template>

<style lang="scss" module>
.mobile-safari-fix {
  max-height: -webkit-fill-available !important;
}
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
})
</script>
