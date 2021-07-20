<template>
  <facet v-bind="$attrs">
    <template #label>Travelling to</template>
    <template #hightlight><country-label :value="destinationCode" /></template>
  </facet>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

import CountryLabel from '@/front/src/components/country/country-label.vue'
import Facet from '@/front/src/pages/destination/components/the-profile-bar/facets/facet.vue'
import { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'

export default defineComponent({
  components: { CountryLabel, Facet },
  setup() {
    const localStore = inject(StoreKey) as StoreModule
    const destinationCode = computed(
      () => localStore.getters.currentDestinationCode,
    )
    return {
      destinationCode,
    }
  },
})
</script>
