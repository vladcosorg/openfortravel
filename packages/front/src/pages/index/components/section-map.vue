<template>
  <div :class="['relative-position']">
    <transition leave-active-class="animated fadeOut slower">
      <img
        v-if="loading !== false"
        class="absolute-full"
        src="../../../assets/map.svg"
      />
    </transition>

    <div ref="chartContainer" :class="[$style.chart]" />
    <q-spinner
      v-if="loading"
      class="absolute-center"
      color="primary"
      size="3em"
      :thickness="10"
    />
  </div>
</template>

<style lang="scss" module>
.placeholder {
  transition: opacity 2s;
  opacity: 1;
}

.chart {
  z-index: 20;
  width: 100%;
  height: 670px;
}
</style>

<script lang="ts">
import type { MapChart } from '@amcharts/amcharts4/maps'
import {
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  ref,
} from '@vue/composition-api'

import { Restriction } from '@/shared/src/api/restrictions/models'

export default defineComponent({
  components: {},
  props: {
    originCode: {
      type: String,
      required: true,
    },
    restrictions: {
      type: Array as PropType<Restriction[]>,
      required: true,
    },
  },
  setup(props) {
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

      chart = createChart(
        chartContainer.value,
        props.originCode,
        props.restrictions,
      )
      chart.events.once('ready', () => {
        chart.events.once('appeared', () => {
          loading.value = false
        })

        chart.hidden = false
        chart.appear()
      })
    }

    onMounted(initializeChart)

    onUnmounted(() => {
      if (chart) {
        chart.dispose()
      }
    })

    return { chartContainer, loading }
  },
})
</script>
