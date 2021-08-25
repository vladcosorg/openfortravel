<template>
  <div class="row items-stretch q-col-gutter-md">
    <stats-item
      v-for="(stat, index) in stats"
      v-bind="stat"
      :key="index"
      class="col-3"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import StatsItem from '@/front/src/pages/country/components/the-search-stats/stats-item.vue'
import { useCountryStore } from '@/front/src/pages/country/pinia-store'

type Stats = Array<{
  title: string
  subtitle: string
  count: number | undefined
  colorClass: string
}>
export default defineComponent({
  components: { StatsItem },
  setup() {
    const countryStore = useCountryStore()
    const stats = computed<Stats>(() => [
      {
        title: 'No restrictions',
        subtitle: 'no COVID test or quarantine upon arrival',
        count: countryStore.groupedResults.open?.length,
        colorClass: 'text-positive',
      },
      {
        title: 'COVID test required',
        subtitle: 'you need to take COVID test before arrival',
        count: countryStore.groupedResults.test?.length,
        colorClass: 'text-warning',
      },
      {
        title: 'Quarantine required',
        subtitle: 'you have to self-isolate for a number of days',
        count: countryStore.groupedResults.quarantine?.length,
        colorClass: 'text-negative',
      },
      {
        title: 'Entry forbidden',
        subtitle: 'no access permitted at this time',
        count: countryStore.groupedResults.forbidden?.length,
        colorClass: 'text-negative',
      },
    ])

    return {
      stats,
    }
  },
})
</script>
