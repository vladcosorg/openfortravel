<template>
  <q-btn
    unelevated
    size="md"
    :disabled="destinationCode === undefined"
    :icon="$q.screen.lt.sm ? swapIconMobile : swapIconDesktop"
    :class="[
      $style.swapper,
      'absolute',
      'q-mx-sm-xs',
      {
        'gt-xs': !destinationCode,
      },
    ]"
  />
</template>

<style lang="scss" module>
.swapper {
  :global {
    .q-btn__wrapper {
      padding: 16px;
    }
  }
  @media (max-width: $breakpoint-xs-max) {
    right: 2%;
    top: 50%;
    transform: translateY(-50%);
    border: #{map-get($space-xs, 'x')} solid #262b32;
    z-index: 1;
    background-color: #353a40;
    font-size: 50px;
  }
  @media (min-width: $breakpoint-xs-max) {
    // Do not remove, prevents CLS
    position: relative;
  }
}
</style>

<script lang="ts">
import {
  matSwapHoriz as swapIconDesktop,
  matSwapVert as swapIconMobile,
} from '@quasar/extras/material-icons'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  props: {
    destinationCode: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  setup() {
    return {
      swapIconDesktop,
      swapIconMobile,
    }
  },
})
</script>
