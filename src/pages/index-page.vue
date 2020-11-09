<template>
  <div class="col column justify-evenly items-center" style="z-index: 2">
    <div class="text-h5 q-px-lg montserrat text-center">
      Find out which destinations are open or reopening soon
    </div>
    <div :class="['', 'relative-position', 'text-center', 'q-pa-lg']">
      <animated-arrow :class="$style.arrow" />
      <the-country-list />
    </div>
    <boy class="q-px-lg" style="justify-self: end" />
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
import { hydrateWhenIdle } from 'vue-lazy-hydration'

import AnimatedArrow from 'src/layouts/components/the-animated-arrow.vue'
import TheCountryList from 'src/layouts/components/the-country-list/the-country-list.vue'

export default defineComponent({
  components: {
    TheCountryList,
    AnimatedArrow,
    Boy: hydrateWhenIdle(
      () => import('src/layouts/components/the-boy/the-boy.vue'),
      {},
    ),
  },
  name: 'PageIndex',
  meta: {
    title: 'lol',
  },
})
</script>
