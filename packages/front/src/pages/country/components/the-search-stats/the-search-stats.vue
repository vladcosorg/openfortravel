<template>
  <div
    class="
      row
      q-col-gutter-x-xl q-col-gutter-sm-x-md q-col-gutter-y-sm
      items-stretch
    "
  >
    <stats-item
      v-for="(stat, index) in stats"
      v-bind="stat"
      :key="index"
      class="col"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { useStatCollection } from '@/front/src/modules/stats/composable'
import StatsItem from '@/front/src/pages/country/components/the-search-stats/stats-item.vue'
import { useCountryStore } from '@/front/src/pages/country/pinia-store'

const countryStore = useCountryStore()
const results = computed(() => countryStore.groupedResults)
const stats = useStatCollection(results)
</script>
