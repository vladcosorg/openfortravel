<template>
  <facet>
    <template #label>Travelling from</template>
    <template #hightlight><country-label :value="originCode" /></template>
  </facet>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import CountryLabel from '@/front/src/components/country/country-label.vue'
import Facet from '@/front/src/pages/destination/components/the-profile-bar/facets/facet.vue'
import { useRootStore } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  components: { CountryLabel, Facet },
  setup() {
    const rootStore = useRootStore()
    const originCode = computed(
      () => rootStore.getters.visitorContextWithDefaults.origin,
    )
    return {
      originCode,
    }
  },
})
</script>
