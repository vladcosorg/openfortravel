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
import { defineComponent, onMounted, onUnmounted, ref, toRef, watch } from 'vue'

import { RoundTripRawPrecomputedRestrictionMap } from '@/shared/src/models/precomputed-restriction/raw-precomputed-restriction'

import type { MapChart } from '@amcharts/amcharts4/maps'
import type { PropType } from 'vue'

export default defineComponent({
  components: {},
  props: {
    originCode: {
      type: String,
      required: true,
    },
    restrictions: {
      type: Object as PropType<RoundTripRawPrecomputedRestrictionMap>,
      required: true,
    },
    isLoading: {
      type: Boolean,
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

      watch(
        () => props.isLoading,
        (isLoading: boolean) => {
          if (isLoading) {
            return
          }

          defer(() => {
            chart = createChart(
              chartContainer.value,
              props.originCode,
              restrictions,
            )
            chart.events.once('ready', () => {
              chart.events.once('appeared', () => {
                loading.value = false
              })

              chart.hidden = false
              chart.appear()
            })
          })
        },
        { immediate: true },
      )
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
