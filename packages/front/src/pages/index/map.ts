import map from '@amcharts/amcharts4-geodata/worldLow'
import { Miller } from '@amcharts/amcharts4/.internal/charts/map/projections'
import { color, create } from '@amcharts/amcharts4/core'
import {
  MapArcSeries,
  MapChart,
  MapPolygonSeries,
} from '@amcharts/amcharts4/maps'
import { getCssVar } from 'quasar'
import { watch, Ref } from 'vue'

import { statusColorMap } from '@/front/src/pages/index/index-composable'
import { goToDestination } from '@/front/src/router/route-builders/destination'
import { useVueI18n } from '@/shared/src/composables/use-plugins'
import { getCountryISOCodes } from '@/shared/src/misc/country-codes'
import { RoundTripRawPrecomputedRestrictionMap } from '@/shared/src/models/precomputed-restriction/raw-precomputed-restriction'

import type { Color } from '@amcharts/amcharts4/core'
import type { MapArc, MapPolygon } from '@amcharts/amcharts4/maps'

type SeriesItem = {
  id: string
  name?: string
  fill: Color
  status: string
}

export function createChart(
  domElement: HTMLElement,
  originCode: string,
  restrictions: Ref<RoundTripRawPrecomputedRestrictionMap>,
): MapChart {
  const chart = createAndConfigureChart(domElement)

  const polygonSeries = createAndConfiguredPolygonSeries(
    chart,
    originCode,
    transformData(restrictions.value),
  )

  watch(restrictions, () => {
    polygonSeries.data = transformData(restrictions.value)
    chart.invalidateData()
  })

  const polygonTemplate = polygonSeries.mapPolygons.template

  configurePolygonTemplate(polygonTemplate)
  //
  // chart.events.once('inited', () => {
  //   polygonSeries.mapPolygons.each((polygon) => {
  //     setTimeout(() => {
  //       polygon.show()
  //     }, random(500, 1000))
  //   })
  // })

  configureTooltip(polygonSeries)

  addHitHandler(polygonTemplate, originCode)
  addHoverHandler(chart, polygonTemplate, polygonSeries, originCode)

  addHoverState(polygonTemplate)

  return chart
}

export function createAndConfigureChart(domElement: HTMLElement): MapChart {
  const chart = create(domElement, MapChart)
  chart.showOnInit = true
  chart.geodata = map
  chart.projection = new Miller()
  chart.chartContainer.wheelable = false
  chart.maxZoomLevel = 1
  chart.deltaLongitude = -10
  chart.seriesContainer.resizable = false
  chart.seriesContainer.draggable = false
  return chart
}

export function createAndConfiguredPolygonSeries(
  chart: MapChart,
  originCode: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: SeriesItem[],
): MapPolygonSeries {
  originCode = originCode.toUpperCase()
  const polygonSeries = chart.series.push(new MapPolygonSeries())
  polygonSeries.useGeodata = true
  polygonSeries.data = data

  polygonSeries.calculateVisualCenter = true

  polygonSeries.exclude = ['AQ']
  polygonSeries.include = [
    originCode,
    ...getCountryISOCodes().map((code) => code.toUpperCase()),
  ]
  console.log(polygonSeries.include)
  // polygonSeries.defaultState.transitionDuration = 2000

  polygonSeries.events.on('ready', () => {
    const originPolygon = polygonSeries.getPolygonById(originCode)
    originPolygon.interactionsEnabled = false
    originPolygon.fill = color('#3B4AEC')
  })

  return polygonSeries
}

export function addHitHandler(
  polygonTemplate: MapPolygon,
  originCode: string,
): void {
  polygonTemplate.events.on('hit', (event) => {
    const dataContext = event.target.dataItem.dataContext as SeriesItem
    const destinationCode = dataContext.id.toLowerCase()

    if (originCode === destinationCode) {
      return
    }

    void goToDestination({ destinationSlug: destinationCode })
  })
}

export function addHoverHandler(
  chart: MapChart,
  polygonTemplate: MapPolygon,
  polygonSeries: MapPolygonSeries,
  originCode: string,
): void {
  const lineSeries = chart.series.push(new MapArcSeries())
  const lineTemplate = lineSeries.mapLines.template

  configureLine(lineTemplate)
  configureArrow(lineTemplate)

  originCode = originCode.toUpperCase()

  polygonTemplate.events.on('over', (event) => {
    const originPolygon = polygonSeries.getPolygonById(originCode)
    const destinationPolygon = event.target
    lineSeries.data = [
      {
        multiGeoLine: [
          [
            {
              latitude: originPolygon.visualLatitude,
              longitude: originPolygon.visualLongitude,
            },
            {
              latitude: destinationPolygon.visualLatitude,
              longitude: destinationPolygon.visualLongitude,
            },
          ],
        ],
      },
    ]

    event.target.events.once('out', () => {
      lineSeries.removeChildren()
    })
  })
}

export function addHoverState(template: MapPolygon): void {
  const hoverState = template.states.create('hover')
  hoverState.properties.opacity = 0.5
}

function configureArrow(line: MapArc): void {
  const arrow = line.arrow
  arrow.position = 1
  arrow.height = 15
  arrow.width = 15
  arrow.strokeLinecap = 'round'
  arrow.strokeLinejoin = 'round'
  arrow.strokeWidth = 0
  arrow.fillOpacity = 1
  arrow.interactionsEnabled = false
  arrow.fill = color('white')
}

function configureTooltip(series: MapPolygonSeries) {
  if (series.tooltip) {
    series.tooltip.background.cornerRadius = 4
    series.tooltip.background.strokeOpacity = 1
    series.tooltip.background.strokeWidth = 2

    series.tooltip.pointerOrientation = 'vertical'
    series.tooltip.label.minWidth = 40
    series.tooltip.label.minHeight = 40
    series.tooltip.label.textAlign = 'middle'
  }

  const polygonTemplate = series.mapPolygons.template
  polygonTemplate.tooltipText =
    '[text-align: right font-size: 18px]{name}[/]\n[bold]{status}[/]\n\nClick to read more'
}

function configureLine(lineTemplate: MapArc): void {
  lineTemplate.shortestDistance = false
  lineTemplate.interactionsEnabled = false
  lineTemplate.line.controlPointDistance = 0.1
  lineTemplate.line.stroke = color('white')
  lineTemplate.line.strokeDasharray = '4,6'
  lineTemplate.line.strokeWidth = 2
  lineTemplate.line.strokeLinecap = 'round'
}

export function configurePolygonTemplate(template: MapPolygon): void {
  template.fill = color(getCssVar('primary-inverse') as string)
  template.stroke = color('#272f56')
  template.strokeWidth = 1
  template.propertyFields.fill = 'fill'
  // template.defaultState.transitionDuration = 500
  // template.hidden = true
}

function transformData(
  restrictions: RoundTripRawPrecomputedRestrictionMap,
): SeriesItem[] {
  const { t } = useVueI18n()
  return Object.entries(restrictions).map(([countryISO, restriction]) => ({
    id: countryISO.toUpperCase(),
    fill: color(
      getCssVar(statusColorMap[restriction.outgoing.status]) as string,
    ),
    status: t(
      `page.index.sections.stats.types.${restriction.outgoing.status}.title`,
    ),
  }))
}
