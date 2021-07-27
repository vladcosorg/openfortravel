<template>
  <facet>
    <template v-if="vaccine" #label>Vaccinated with</template>
    <template v-if="vaccine" #hightlight
      ><vaccine-label :value="vaccine"
    /></template>
    <template v-else #hightlight>Not vaccinated</template>
  </facet>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import VaccineLabel from '@/front/src/components/vaccine-label.vue'
import Facet from '@/front/src/pages/destination/components/the-profile-bar/facets/facet.vue'
import { useRootStore } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  components: { VaccineLabel, Facet },
  setup() {
    const rootStore = useRootStore()
    const vaccine = computed(
      () => rootStore.getters.visitorContextWithDefaults.vaccinated?.brand,
    )
    return {
      vaccine,
    }
  },
})
</script>
