<template>
  <section v-if="destination">
    <widget-header
      title="Return restriction"
      subtitle="Click to see other alternatives"
    />
    <destination-item
      :returning="true"
      :journey="destination"
      hide-risk-level
      hide-border
    />
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

import DestinationItem from '@/front/src/pages/country/components/destination-item.vue'
import WidgetHeader from '@/front/src/pages/destination/components/widget-header.vue'
import type { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'

export default defineComponent({
  components: { DestinationItem, WidgetHeader },
  setup() {
    const store = inject(StoreKey) as StoreModule

    const destination = computed(() => store.getters.returnTripCard)

    return { destination }
  },
})
</script>
