<template>
  <div
    :class="[
      'col-auto column justify-end  relative-position text-center',
      showArrow ? 'q-mb-xl  q-px-lg' : 'q-mb-sm  q-px-md',
    ]"
  >
    <animated-arrow v-if="showArrow" :class="$style.arrow" />

    <transition
      appear
      enter-active-class="animated bounceInUp"
      leave-active-class="animated bounceInUp"
    >
      <country-list :show-button="showArrow" />
    </transition>
  </div>
</template>

<style lang="scss" module>
.arrow {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-100%);
}
</style>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import AnimatedArrow from 'src/layouts/components/the-animated-arrow.vue'
import CountryList from 'src/layouts/components/the-country-list.vue'

export default defineComponent({
  components: { AnimatedArrow, CountryList },
  props: {
    showArrow: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {}
  },
})
</script>
