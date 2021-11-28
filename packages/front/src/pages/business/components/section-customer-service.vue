<template>
  <landing-section>
    <template #title>
      <span v-html="$t('page.forBusiness.sections.cs.title')" />
    </template>
    <template #subtitle>
      <span v-html="$t('page.forBusiness.sections.cs.subtitle')" />
    </template>
    <template #content>
      <div class="row negative-margin-xs-only">
        <timeframe-section
          id="before"
          :current-id="activeSection"
          title-class="text-negative"
          @activation="onMouseEnter"
          @deactivation="onMouseLeave"
        >
          <template #title>
            <i18n-l keypath="page.forBusiness.sections.cs.before">
              <template #keyword="{ innerContent }">
                <span
                  class="text-h4 text-bold text-negative block"
                  style="font-weight: bold"
                >
                  {{ innerContent }}
                </span>
              </template>
              <template #platform> <b>Openfortravel Platfrom</b> </template>
            </i18n-l>
          </template>
          <template #content>
            <section-feature-line
              v-for="(feature, index) in negativeFeatures"
              :key="index"
              class="text-h6"
              negative
              :content="feature"
            />
          </template>
        </timeframe-section>
        <timeframe-section
          id="after"
          :current-id="activeSection"
          title-class="text-positive"
          @activation="onMouseEnter"
          @deactivation="onMouseLeave"
        >
          <template #title>
            <i18n-l keypath="page.forBusiness.sections.cs.after">
              <template #keyword="{ innerContent }">
                <span
                  class="text-h4 text-bold text-positive s block"
                  style="font-weight: bold"
                >
                  {{ innerContent }}
                </span>
              </template>
              <template #platform> <b>Openfortravel Platfrom</b> </template>
            </i18n-l>
          </template>
          <template #content>
            <section-feature-line
              v-for="(feature, index) in positiveFeatures"
              :key="index"
              class="text-h6"
              :content="feature"
            />
          </template>
        </timeframe-section>
      </div>
      <div v-if="$q.screen.gt.xs" class="q-mt-xl">
        <q-no-ssr>
          <before-after-chart :active-section="activeSection" />
        </q-no-ssr>
      </div>
    </template>
  </landing-section>
</template>

<style lang="scss" scoped>
.panel {
  transition-property: background-color;
  transition-duration: 0.5s;
}
</style>

<script lang="ts" setup>
import { useIntervalFn } from '@vueuse/core'
import { defineAsyncComponent } from 'vue'

import LandingSection from '@/front/src/components/section-elements/landing-section.vue'
import { useCollectionToggle } from '@/front/src/composables/misc'
import { useCustomI18n } from '@/front/src/modules/i18n/composables'
import I18nL from '@/front/src/modules/i18n/i18n-l.vue'
import SectionFeatureLine from '@/front/src/pages/business/components/common/section-feature-line.vue'
import TimeframeSection from '@/front/src/pages/business/components/section-customer-service/timeframe-section.vue'

const BeforeAfterChart = defineAsyncComponent(
  () =>
    import(
      '@/front/src/pages/business/components/section-customer-service/before-after-chart.vue'
    ),
)
const { t, tm } = useCustomI18n()
const negativeFeatures = tm('page.forBusiness.sections.cs.negativeFeatures')
const positiveFeatures = tm('page.forBusiness.sections.cs.positiveFeatures')

const {
  currentValue: activeSection,
  next,
  setValue,
} = useCollectionToggle(['before', 'after'])
const { pause, resume } = useIntervalFn(() => next(), 3000)
const onMouseEnter = (activeSection: string) => {
  setValue(activeSection)
  pause()
}
const onMouseLeave = () => resume()
</script>
