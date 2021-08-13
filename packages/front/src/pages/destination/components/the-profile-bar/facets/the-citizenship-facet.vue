<template>
  <facet>
    <template #label>Citizen or resident of</template>
    <template #hightlight
      ><country-label-list :values="citizenshipISOList"
    /></template>
  </facet>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import CountryLabelList from '@/front/src/components/country/country-label-list.vue'
import Facet from '@/front/src/pages/destination/components/the-profile-bar/facets/facet.vue'
import { useRootStore } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  components: { CountryLabelList, Facet },
  setup() {
    const rootStore = useRootStore()
    const citizenshipISOList = computed(
      () => rootStore.getters.visitorContextWithDefaults.citizenship,
    )
    return {
      citizenshipISOList,
    }
  },
})
</script>
