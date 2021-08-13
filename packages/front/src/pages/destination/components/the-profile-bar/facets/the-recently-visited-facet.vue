<template>
  <facet>
    <template #label>Recently visited</template>
    <template #hightlight
      ><country-label-list :values="countryISOList"
    /></template>
  </facet>
</template>

<script lang="ts">
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { computed, defineComponent } from 'vue'

import CountryLabelList from '@/front/src/components/country/country-label-list.vue'
import Facet from '@/front/src/pages/destination/components/the-profile-bar/facets/facet.vue'

export default defineComponent({
  components: { CountryLabelList, Facet },
  setup() {
    const rootStore = useRootStore()
    const countryISOList = computed(
      () =>
        rootStore.getters.visitorContextWithDefaults['did-not-visit-countries'],
    )
    return {
      countryISOList,
    }
  },
})
</script>
