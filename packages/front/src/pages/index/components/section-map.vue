<template>
  <div class="relative-position">
    <div ref="chartContainer" class="chart" />
    <q-spinner
      v-if="loading"
      class="absolute-center"
      color="primary"
      size="3em"
      :thickness="10"
    />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  z-index: 20;
  width: 100%;
  height: 670px;
}
</style>

<script lang="ts">
import defer from 'lodash/defer'
import { defineComponent, onMounted, onUnmounted, ref, toRef } from 'vue'

import { useRootStore } from '@/shared/src/composables/use-plugins'
import { RoundTripCollection } from '@/shared/src/models/trip/round-trip'

import type { MapChart } from '@amcharts/amcharts4/maps'
import type { PropType } from 'vue'

export default defineComponent({
  components: {},
  props: {
    restrictions: {
      type: Object as PropType<RoundTripCollection>,
      required: true,
    },
  },
  setup(props) {
    const restrictions = toRef(props, 'restrictions')
    const chartContainer = ref()
    const loading = ref<boolean | undefined>()
    let chart: MapChart
    const initializeChart = async () => {
      loading.value = true
      const { createChart } = await import(
        /* webpackChunkName: "map" */ '@/front/src/pages/index/map'
      )
      if (chart) {
        chart.dispose()
      }

      defer(() => {
        chart = createChart(
          chartContainer.value,
          useRootStore().getters.visitorOrigin,
          restrictions,
        )
        chart.events.once('ready', () => {
          loading.value = false
        })
      })
    }

    onMounted(initializeChart)

    onUnmounted(() => {
      if (!chart) {
        return
      }
      chart.dispose()
    })

    return { chartContainer, loading }
  },
})
</script>
