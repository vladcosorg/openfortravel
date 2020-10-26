<template>
  <div>
    <img
      ref="svg"
      svg-inline
      :class="{
        [$style.boy]: true,
        [$style['handStartedRaising']]: handStartedRaising,
        [$style['handFinishedRaising']]: handFinishedRaising,
        [$style['handStartedDropping']]: handStartedDropping,
        [$style['handFinisheDropping']]: handFinisheDropping,
      }"
      src="../../../assets/boy.svg"
    />
  </div>
</template>

<style lang="scss" module>
@import 'animations';

.transform {
  transform-box: fill-box;
  transform-origin: center;
}

.handFinishedRaising :global(#palm) {
  animation: rightHand 0.3s ease-in-out 0s 4 alternate forwards;
  @extend .transform;
  transform-origin: top;
}

.handStartedDropping :global(#palm) {
  @extend .transform;
  animation: palmTracking 0.7s ease-in-out 0s infinite reverse;
}

.handStartedRaising :global(#palm) {
  @extend .transform;
  animation: palmTracking 0.7s ease-in-out 0s infinite normal;
}

.boy {
  height: auto;
  width: 80%;
  z-index: 100;
  top: 40%;
  left: 10%;
  //position: absolute;
  overflow: visible !important;

  :global(#haircreast) {
    @extend .transform;
    animation: moveHair 15s 2s normal infinite ease-in-out;
  }

  :global(#scarf) {
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

  :global(#torso),
  :global(#torso-shadow) {
    @extend .transform;
    animation: torsoMovement 10s 4s alternate infinite ease-in-out;
  }

  :global(#left-hand) {
    @extend .transform;
    animation: leftHand 10s 5s alternate infinite ease-in-out;
  }
}
</style>
<script lang="ts">
import { defineComponent, onMounted, ref, unref } from '@vue/composition-api'
import CountryList from 'layouts/components/the-country-list.vue'

export default defineComponent({
  components: { CountryList },
  setup() {
    const handStartedRaising = ref(false)
    const handFinishedRaising = ref(false)
    const handStartedDropping = ref(false)
    const handFinisheDropping = ref(true)
    const svg = ref<Document | undefined>()

    onMounted(() => {
      const domElement = unref(svg)
      if (!domElement) {
        return
      }

      let animation = domElement.querySelector('#myanim')

      if (!animation) {
        return
      }

      animation.addEventListener('beginEvent', () => {
        handFinisheDropping.value = false
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
        handFinisheDropping.value = true
      })
    })
    return {
      svg,
      handStartedRaising,
      handFinishedRaising,
      handStartedDropping,
      handFinisheDropping,
    }
  },
})
</script>
