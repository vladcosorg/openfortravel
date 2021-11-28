<template>
  <div>
    <div class="text-center">
      <div
        class="text-h5 text-accent"
        style="font-weight: bold"
        v-html="t('page.forBusiness.sections.cs.chart.title')"
      />
      <div
        class="text-subtitle1 text-primary-subtle"
        v-html="t('page.forBusiness.sections.cs.chart.note')"
      />
    </div>
    <div ref="chartContainer" class="chart" />
  </div>
</template>

<style lang="sass" scoped>
.chart
  height: 500px
  &::v-deep
    .text-accent
      fill: var(--q-accent)
    .text-primary-subtle
      fill: var(--q-primary-subtle)
    .integration-grid
      stroke: var(--q-positive)
    .integration-label
      fill: var(--q-positive)
    .pandemic-grid
      stroke: var(--q-negative)
    .pandemic-label
      fill: var(--q-negative)
    .over-capacity
      fill: var(--q-negative)
      stroke: var(--q-negative)
    .cs-capacity-grid
      stroke: var(--q-primary)
    .cs-capacity-label
      fill: var(--q-primary)

  @media (max-width: $breakpoint-xs-max)
    $pad: map-get($space-md, 'x')
    margin-left: -$pad
    margin-right: -$pad
</style>

<script lang="ts" setup>
import {
  XYChart,
  ValueAxis,
  DateAxis,
  ColumnSeries,
  LabelBullet,
} from '@amcharts/amcharts4/charts'
import {
  create,
  useTheme,
  color,
  RoundedRectangle,
} from '@amcharts/amcharts4/core'
import animatedTheme from '@amcharts/amcharts4/themes/animated'
import darkTheme from '@amcharts/amcharts4/themes/dark'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ activeSection: 'before' | 'after' }>()

const { t } = useI18n()
const chartContainer = ref<HTMLElement>()
onMounted(() => {
  useTheme(animatedTheme)
  useTheme(darkTheme)
  const chart = create(chartContainer.value, XYChart)
  chart.data = [
    // { date: new Date(2019, 11), value: 10 },
    { date: new Date(2019, 12), value: 10 },
    { date: new Date(2020, 1), value: 15 },
    { date: new Date(2020, 2), value: 23 },
    { date: new Date(2020, 3), value: 24 },
    { date: new Date(2020, 4), value: 30 },
    { date: new Date(2020, 5), value: 45 },
    { date: new Date(2020, 6), value: 49 },
    { date: new Date(2020, 7), value: 19 },
    { date: new Date(2020, 8), value: 17 },
  ]

  // Create axes
  chart.chartContainer.paddingBottom = 20

  let categoryAxis = chart.xAxes.push(new DateAxis())
  categoryAxis.dataFields.date = 'date'
  // categoryAxis.renderer.inversed = true

  // categoryAxis.fontSize = 16
  // categoryAxis.renderer.labels.template.wrap = true
  // categoryAxis.renderer.labels.template.maxWidth = 70
  // categoryAxis.renderer.labels.template.valign = 'top'
  categoryAxis.renderer.minGridDistance = 1
  // categoryAxis.renderer.opposite = true
  categoryAxis.renderer.inside = true
  // categoryAxis.renderer.grid.template.location = 0.5
  // categoryAxis.startLocation = 0.5
  // categoryAxis.endLocation = 0.6
  // categoryAxis.renderer.labels.template.disabled = true
  // categoryAxis.renderer.grid.template.disabled = true
  // categoryAxis.renderer.cellStartLocation = 0.2
  // categoryAxis.renderer.cellEndLocation = 0.8
  categoryAxis.renderer.labels.template.fill = color('#1d2a4b')
  categoryAxis.renderer.labels.template.fontWeight = 'bolder'
  // categoryAxis.renderer.labels.template.fontSize = 15
  // categoryAxis.renderer.labels.template.wrap = true
  // categoryAxis.renderer.labels.template.wrap = true
  // categoryAxis.renderer.labels.template.horizontalCenter = 'middle'
  // categoryAxis.renderer.labels.template.dx = 200
  // categoryAxis.renderer.labels.template.

  // Create value axis
  let valueAxis = chart.yAxes.push(new ValueAxis())
  // valueAxis.renderer.grid.template.disabled = true
  // valueAxis.title.text = t('page.forBusiness.sections.cs.chart.title')
  // valueAxis.title.userClassName = 'text-accent'
  // valueAxis.renderer.opposite = true
  // valueAxis.title.fontWeight = 'bold'
  // valueAxis.title.fontSize = 17

  valueAxis.min = 0
  valueAxis.max = 60
  valueAxis.renderer.labels.template.disabled = true
  // valueAxis.renderer.grid.template.disabled = true

  for (const index of [1, 2, 3, 4, 5]) {
    const range$ = valueAxis.axisRanges.create()
    range$.value = 10 * index
    range$.label.fontWeight = 'bolder'
    range$.label.fontSize = 17
    range$.label.userClassName = 'text-primary-subtle'
    range$.grid.disabled = true
    range$.label.text = '$'.repeat(index)
  }

  // valueAxis.baseValue = 0

  // Create series
  let series = chart.series.push(new ColumnSeries())
  series.dataFields.valueY = 'value'
  series.dataFields.dateX = 'date'
  // series.strokeWidth = 0
  // series.tensionX = 0.77
  // series.columns.template.height = percent(100)
  series.columns.template.column.cornerRadiusTopLeft = 5
  series.columns.template.column.cornerRadiusTopRight = 5
  series.columns.template.column.fillOpacity = 0.7
  //
  // console.log(chart.colors)
  series.columns.template.strokeOpacity = 0
  series.columns.template.adapter.add(
    'fill',
    (fill: any, target: ColumnSeries) => {
      if (target.dataItem.valueY <= 20) {
        return color('#75D4B8')
      } else if (target.dataItem.valueY <= 30) {
        return color('#EED46A')
      } else {
        return color('#F08A69')
      }
    },
  )

  let labelBullet = series.bullets.push(new LabelBullet())
  labelBullet.label.background = new RoundedRectangle()
  labelBullet.label.background.cornerRadius(5, 5, 5, 5)
  labelBullet.label.padding(4, 8, 4, 8)
  labelBullet.label.background.fill = color('#eee')
  labelBullet.label.background.opacity = 0.8
  // labelBullet.label.dy = 2
  // labelBullet.label.dx = -10
  labelBullet.label.horizontalCenter = 'middle'
  labelBullet.label.fontSize = 15
  labelBullet.label.fontWeight = 'bolder'
  labelBullet.label.fill = color('#1d2a4b')
  // labelBullet.label.text = '{values.valueX.workingValue}'
  labelBullet.label.adapter.add('text', (a, target: ColumnSeries) => {
    if (target.dataItem.valueY <= 10) {
      return '$'
    } else if (target.dataItem.valueY <= 20) {
      return '$$'
    } else if (target.dataItem.valueY <= 30) {
      return '$$$'
    } else if (target.dataItem.valueY <= 40) {
      return '$$$$'
    } else {
      return '$$$$$'
    }
  })
  // labelBullet.locationX = 1
  let pandemicRange = categoryAxis.axisRanges.create()
  pandemicRange.date = new Date(2020, 1)
  pandemicRange.grid.userClassName = 'pandemic-grid'
  // pandemicRange.label.rotation = 90
  pandemicRange.grid.strokeWidth = 1
  pandemicRange.grid.strokeOpacity = 1
  pandemicRange.grid.strokeDasharray = '2'
  pandemicRange.label.dataItem.text = t(
    'page.forBusiness.sections.cs.chart.pandemicLabel',
  )
  pandemicRange.label.fontWeight = 'bold'
  pandemicRange.label.fontSize = 15
  // pandemicRange.label.valign = 'top'
  pandemicRange.label.userClassName = 'pandemic-label'
  // pandemicRange.label.paddingTop = 40
  pandemicRange.label.inside = false
  pandemicRange.label.wrap = false
  // pandemicRange.label.align = 'right'
  // pandemicRange.label.verticalCenter = 'top'
  // range3.label.fillOpacity = 0.5

  // const label = chart.chartContainer.createChild(Label)
  // label.userClassName = 'text-primary-subtle'
  // label.fontSize = 12
  // label.paddingTop = 10
  // label.align = 'center'
  // label.verticalCenter = 'bottom'

  let integrationRange = categoryAxis.axisRanges.create()
  integrationRange.date = new Date(2020, 7)

  integrationRange.grid.userClassName = 'integration-grid'
  integrationRange.grid.strokeWidth = 1
  integrationRange.grid.strokeOpacity = 1
  integrationRange.grid.strokeDasharray = '2'
  integrationRange.label.inside = false
  integrationRange.label.fontSize = 15
  integrationRange.label.fontWeight = 'normal'
  // range4.label.fillOpacity = 0.5

  integrationRange.label.dataItem.text = t(
    'page.forBusiness.sections.cs.chart.platformLabel',
  )
  // range4.label.fill = range2.grid.stroke
  // integrationRange.label.valign = 'top'
  // integrationRange.label.paddingTop = 40
  integrationRange.label.fontWeight = 'bold'
  integrationRange.label.userClassName = 'integration-label'

  let event = categoryAxis.axisRanges.create()
  event.axisFill.fillOpacity = 0.1
  event.contents
  event.grid.disabled = true
  watch(
    () => props.activeSection,
    (section) => {
      if (section === 'before') {
        event.date = new Date(2020, 1)
        event.endDate = new Date(2020, 7)
      } else {
        event.date = new Date(2020, 7)
        event.endDate = new Date(2020, 9)
      }
    },
    { immediate: true },
  )

  // range4.label.location = 0.5
  // range4.label.location = 0.5
  // range4.label.horizontalCenter = 'left'
  // range4.label.rotation = 90
  // range4.grid.disabled = true
  // range4.label.verticalCenter = 'bottom'
})
</script>
