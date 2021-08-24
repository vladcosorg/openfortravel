<template>
  <section v-if="countryFactsheet">
    <widget-header
      :title="$t('page.destination.widgets.stats.title')"
      :subtitle="
        countryFactsheet &&
        $t('page.destination.widgets.stats.subtitle', {
          country: countryFactsheet.name,
        })
      "
    />
    <q-list>
      <q-item>
        <q-item-section top avatar>
          <q-avatar size="60px" :icon="coronavirus" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            <strong>{{ countryFactsheet.thisWeekCasesFixed }}</strong>
            {{ $t('page.destination.widgets.stats.casesThisWeek.title') }}
          </q-item-label>
          <q-item-label caption>{{
            $t('page.destination.widgets.stats.casesThisWeek.subtitle')
          }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section top avatar>
          <q-avatar size="60px" :text-color="trendColor" :icon="trendIcon" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            {{ trendWord }}
            <strong>{{ countryFactsheet.fixedPercentage }}%</strong>
          </q-item-label>
          <q-item-label caption>
            {{
              $t('page.destination.widgets.stats.trend.subtitle', {
                count: countryFactsheet.lastWeekCasesFixed,
              })
            }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section top avatar>
          <q-avatar size="60px" :icon="cdcRiskLevel" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            {{ $t('page.destination.widgets.stats.riskLevel.title') }}:
            <span :class="riskLevelColor(countryFactsheet.riskLevel)">
              {{
                $t(
                  `components.destinationItem.riskLevel.values.${countryFactsheet.riskLevel}`,
                )
              }}
            </span>
          </q-item-label>
          <q-item-label caption>
            {{ $t('page.destination.widgets.stats.riskLevel.subtitle') }}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.cdc.gov/coronavirus/2019-ncov/travelers/map-and-travel-notices.html"
            >
              CDC
            </a>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </section>
</template>

<script lang="ts">
import {
  matTrendingDown as trendingDown,
  matTrendingFlat as trendingFlat,
  matTrendingUp as trendingUp,
  matCoronavirus as coronavirus,
  matAnnouncement as cdcRiskLevel,
} from '@quasar/extras/material-icons'
import { computed, defineComponent, PropType } from 'vue'

import { riskLevelColor } from '@/front/src/pages/country/composable'
import WidgetHeader from '@/front/src/pages/destination/components/widget-header.vue'
import { CountryFactsheet } from '@/shared/src/api/destinations/country-factsheet'
import { useVueI18n } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  components: { WidgetHeader },
  props: {
    countryFactsheet: {
      type: Object as PropType<CountryFactsheet>,
    },
  },
  setup(props) {
    const { t } = useVueI18n()

    const percentageSign = computed(() => {
      if (!props.countryFactsheet) {
        return
      }

      return Math.sign(props.countryFactsheet.percentage)
    })

    const trendWord = computed(() => {
      const sign = percentageSign.value

      if (sign === 1) {
        return t('page.destination.widgets.stats.trend.title.up')
      } else if (sign === -1) {
        return t('page.destination.widgets.stats.trend.title.down')
      } else {
        return t('page.destination.widgets.stats.trend.title.noChange')
      }
    })

    const trendIcon = computed(() => {
      const sign = percentageSign.value

      if (sign === 1) {
        return trendingUp
      } else if (sign === -1) {
        return trendingDown
      } else {
        return trendingFlat
      }
    })

    const trendColor = computed(() => {
      const sign = percentageSign.value

      if (sign === 1) {
        return 'negative'
      } else if (sign === -1) {
        return 'positive'
      } else {
        return 'secondary'
      }
    })

    return {
      trendWord,
      trendIcon,
      trendColor,
      cdcRiskLevel,
      coronavirus,
      riskLevelColor,
    }
  },
})
</script>
