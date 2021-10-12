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
      class="col-lg col-md-3 col-sm-6 col-12 wrap"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'

import { useStatCollection } from '@/front/src/modules/stats/composable'
import { groupTripsByCategory } from '@/front/src/modules/stats/helpers'
import StatsItem from '@/front/src/pages/index/components/the-stats-section/stats-item.vue'
import { RoundTripCollection } from '@/shared/src/models/trip/round-trip'

const props = defineProps({
  trips: {
    type: Array as PropType<RoundTripCollection>,
    required: true,
  },
})
const stats = useStatCollection(
  computed(() => groupTripsByCategory(props.trips)),
)
</script>
