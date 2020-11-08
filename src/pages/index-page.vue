<template>
  <div class="col column justify-evenly" style="z-index: 2">
    <the-travel-bar :class="{ 'order-last': true }" :show-arrow="true" />
    <div class="col-auto text-h5 q-px-lg montserrat text-center">
      Find out which destinations are open or reopening soon
    </div>
    <boy class="col-6 column items-center justify-end" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { hydrateWhenIdle } from 'vue-lazy-hydration'

import TheTravelBar from 'src/layouts/components/the-travel-bar.vue'

export default defineComponent({
  components: {
    TheTravelBar,
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
