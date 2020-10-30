<template>
  <div class="col column justify-evenly" style="z-index: 2">
    <div class="col-auto text-h5 q-px-lg montserrat text-center">
      Find out which destinations are open or reopening soon
    </div>
    <boy class="col-6 column items-center justify-end" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { hydrateWhenIdle } from 'vue-lazy-hydration'

export default defineComponent({
  components: {
    Boy: hydrateWhenIdle(
      () => import('layouts/components/the-boy/the-boy.vue'),
    ),
  },
  name: 'PageIndex',
  meta: {
    title: 'lol',
  },
})
</script>
