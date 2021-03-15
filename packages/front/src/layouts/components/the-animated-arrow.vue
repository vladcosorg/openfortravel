<template>
  <svg :class="$style.svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 411.94 305.6">
    <path
      :class="$style.line"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M.36.34s63.71,68,291,44c226.85-23.92,82.54,166.64-28,255"
    />
    <polygon
      :class="$style.arrow"
      points="277.18 301.87 256.26 305.6 259.96 284.69 264.02 298.06 277.18 301.87"
    />
  </svg>
</template>

<style lang="scss" module>
.svg {
  width: 100%;
  z-index: 1;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
.line {
  fill: none;
  stroke: $accent;
  stroke-miterlimit: 10;
  fill-rule: evenodd;
  animation-delay: 1s;
  animation-duration: 1s;
  animation-name: draw;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
}
@keyframes appear {
  to {
    opacity: 1;
  }
}
.arrow {
  fill: $accent;
  opacity: 0;
  animation-delay: 1.5s;
  animation-duration: 0.5s;
  animation-name: appear;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}
</style>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
