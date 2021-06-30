<template>
  <div class="q-my-xs">
    <div v-if="!isLoading">
      <h5 class="text-h4 q-ma-none">
        Travel restrictions from
        <country-label regular focused :value="origin" /> to
        <country-label regular focused :value="destination" />
      </h5>
      <h6 class="text-subtitle1">
        as a citizen of <span class="text-accent">Ukraine</span> that is
        <span class="text-accent">not vaccinated</span>
      </h6>
    </div>
    <h5 v-else>
      <q-skeleton class="inline-block" type="text" width="80%" />
    </h5>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from '@vue/composition-api'

import CountryLabel from '@/front/src/components/country/country-label.vue'
import { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'

export default defineComponent({
  components: { CountryLabel },
  props: {
    isLoading: {
      type: Boolean,
    },
  },
  setup() {
    const store = inject(StoreKey) as StoreModule
    const origin = computed(() => store.state.currentOriginCode)
    const destination = computed(() => store.state.currentDestinationCode)
    return {
      origin,
      destination,
    }
  },
})
</script>
