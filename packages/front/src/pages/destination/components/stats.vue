<template>
  <section>
    <widget-header
      :title="$t('page.destination.widgets.stats.title')"
      :subtitle="$t('page.destination.widgets.stats.subtitle', { country: destination.name })"
    />
    <q-list v-if="!isLoading">
      <q-item>
        <q-item-section top avatar>
          <q-avatar size="60px" :icon="coronavirus" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            <strong>{{ destination.thisWeekCasesFixed }}</strong>
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
            {{ trendWord }} <strong>{{ destination.fixedPercentage }}%</strong>
          </q-item-label>
          <q-item-label caption>
            {{
              $t('page.destination.widgets.stats.trend.subtitle', {
                count: destination.lastWeekCasesFixed,
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
            <span :class="riskLevelColor(destination.riskLevel)">
              {{ $t('components.destinationItem.riskLevel.values')[destination.riskLevel] }}
            </span>
          </q-item-label>
          <q-item-label caption>
            {{ $t('page.destination.widgets.stats.riskLevel.subtitle') }}
            <a
              target="_blank"
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

<style lang="scss" module></style>

<script lang="ts">
import {
  matTrendingDown as trendingDown,
  matTrendingFlat as trendingFlat,
  matTrendingUp as trendingUp,
  matCoronavirus as coronavirus,
  matAnnouncement as cdcRiskLevel,
} from '@quasar/extras/material-icons'
import { computed, defineComponent, inject } from '@vue/composition-api'

import { riskLevelColor } from '@/front/src/pages/country/composable'
import WidgetHeader from '@/front/src/pages/destination/components/widget-header.vue'
import { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { useVueI18n } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  components: { WidgetHeader },
  props: {
    isLoading: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const { t } = useVueI18n()
    const store = inject(StoreKey) as StoreModule

    const destination = computed(() => store.getters.currentDestination)
    const percentageSign = computed(() => {
      if (!destination.value) {
        return
      }

      return Math.sign(destination.value.percentage)
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
      destination,
      percentageSign,
      trendWord,
      trendIcon,
      trendColor,
      cdcRiskLevel,
      coronavirus,
      trendingUp,
      trendingDown,
      trendingFlat,
      riskLevelColor,
    }
  },
})
</script>
