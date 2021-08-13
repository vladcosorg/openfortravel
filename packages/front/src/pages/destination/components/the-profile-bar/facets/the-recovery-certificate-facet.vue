<template>
  <facet>
    <template #label>Recovery certificate</template>
    <template v-if="daysAgo" #hightlight>{{ daysAgo }}</template>
    <template v-else #hightlight>not available</template>
  </facet>
</template>

<script lang="ts">
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { computed, defineComponent } from 'vue'

import Facet from '@/front/src/pages/destination/components/the-profile-bar/facets/facet.vue'

export default defineComponent({
  components: { Facet },
  setup() {
    const rootStore = useRootStore()
    const daysAgo = computed(
      () => rootStore.getters.visitorContextWithDefaults.recovery,
    )
    return {
      daysAgo,
    }
  },
})
</script>
