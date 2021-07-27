<template>
  <facet text-color="positive"> Click to edit </facet>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import Facet from '@/front/src/pages/destination/components/the-profile-bar/facets/facet.vue'
import { useRootStore } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  components: { Facet },
  setup() {
    const rootStore = useRootStore()
    const age = computed(
      () => rootStore.getters.visitorContextWithDefaults.age ?? 18,
    )
    return {
      age,
    }
  },
})
</script>
