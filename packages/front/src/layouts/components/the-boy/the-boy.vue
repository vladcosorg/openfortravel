<template>
  <inline-svg
    :src="svg"
    :class="{
      [$style.boy]: true,
      [$style['handFinishedRaising']]: handFinishedRaising,
    }"
    @loaded="loaded"
  />
</template>

<style lang="scss" module>
@import 'animations';

.transform {
  transform-box: fill-box;
  transform-origin: center;
}

.handFinishedRaising :global(#palm-right) {
  animation: rightHand 0.3s ease-in-out 0s 4 alternate forwards;
  @extend .transform;
  transform-origin: top;
}

.handStartedDropping :global(#palm-right) {
  @extend .transform;
  animation-name: palmTracking;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-duration: 0.7s;
  animation-direction: reverse;
}

.handStartedRaising :global(#palm-right) {
  @extend .transform;
  animation-name: palmTracking;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-duration: 0.7s;
}

.boy {
  overflow: visible !important;

  :global(#boy) {
    @extend .transform;
    animation: boyFlip 15s 3s normal infinite steps(3);
  }

  :global(#haircreast) {
    @extend .transform;
    animation: moveHair 15s 2s normal infinite ease-in-out;
  }

  :global(#scarf-ends) {
    @extend .transform;
    transform-origin: top;
    animation: moveScarf normal 15s 2s infinite ease-in-out;
  }

  :global(#eyes) ellipse {
    @extend .transform;
    animation: blinkEyes normal 5s 3s infinite ease-in-out;
    transform: rotate(4deg);
  }

  :global(#brows) {
    @extend .transform;
    transform-origin: right;
    animation: brows normal 10s 5s infinite ease-in-out;
    animation-name: brows;
  }

  :global(#left-brow) {
    @extend .transform;
    animation: leftBrow normal 20s 2s infinite ease-in-out;
  }

  :global(#right-brow) {
    @extend .transform;
    animation: rightBrow normal 20s 2s infinite ease-in-out;
  }

  :global(#without-legs),
  :global(#torso-shadow) {
    @extend .transform;
    animation: torsoMovement 10s 4s alternate infinite ease-in-out;
  }

  :global(#palm-left) {
    @extend .transform;
    animation: leftHand 10s 5s alternate infinite ease-in-out;
  }
}
</style>
<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import InlineSvg from 'vue-inline-svg'

import { useStore } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  components: { InlineSvg },
  setup() {
    const handStartedRaising = ref(false)
    const handFinishedRaising = ref(false)
    const handStartedDropping = ref(false)
    const loaded = (domElement: Document) => {
      let animation = domElement.querySelector('#myanim')

      if (!animation) {
        return
      }

      animation.addEventListener('beginEvent', () => {
        handStartedRaising.value = true
      })
      animation.addEventListener('endEvent', () => {
        handStartedRaising.value = false
        handFinishedRaising.value = true
      })

      animation = domElement.querySelector('#myanim2')

      if (!animation) {
        return
      }

      animation.addEventListener('beginEvent', () => {
        handStartedDropping.value = true
        handFinishedRaising.value = false
      })
      animation.addEventListener('endEvent', () => {
        handStartedDropping.value = false
      })
    }

    const svg = computed(() => {
      const country = useStore().state.detectedCountry
      // eslint-disable-next-line no-undef
      return require(country === 'md'
        ? '@/front/src/assets/boy/boy-md.svg'
        : '@/front/src/assets/boy/boy.svg')
    })

    return {
      svg,
      loaded,
      handStartedRaising,
      handFinishedRaising,
      handStartedDropping,
    }
  },
})
</script>
