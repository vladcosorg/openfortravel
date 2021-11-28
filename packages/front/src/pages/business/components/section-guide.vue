<template>
  <landing-section :featured-content-col-size="7" opposite>
    <template #root>
      <section-bg-shape />
    </template>
    <template #title>
      <b>
        Help your customers get
        <span class="text-accent">personalized</span> travel advisory.</b
      >
      Seemlessly integrated into your website or app.
    </template>
    <template #subtitle>
      Free integration by our specialists in under 1 day.
    </template>
    <template #content>
      <section-guide-content />
    </template>
    <template #featured-content>
      <q-card flat class="bg-elevation-1">
        <section-guide-header />

        <q-separator />

        <q-card-section horizontal>
          <q-card-section class="col">
            <section-interactive-stepper v-model="step" />
          </q-card-section>

          <q-separator vertical />

          <q-card-section class="col-4 q-gutter-y-xs">
            <template v-if="step === 7">
              <stats-item
                dense
                type="open"
                :count="36"
                class="col-12 col-sm-6 col-md"
              />
              <stats-item
                dense
                type="test"
                :count="36"
                class="col-12 col-sm-6 col-md"
              />
              <stats-item
                dense
                type="quarantine"
                :count="36"
                class="col-12 col-sm-6 col-md"
              />
              <stats-item
                dense
                type="forbidden"
                :count="36"
                class="col-12 col-sm-6 col-md"
              />
            </template>
            <template v-else>
              <q-skeleton height="20px" width="50%" animation="none" />
              <q-skeleton height="10px" width="100%" animation="none" />
              <q-skeleton height="10px" width="70%" animation="none" />
              <q-skeleton height="10px" width="20%" animation="none" />
              <q-skeleton
                class="q-mt-xl"
                height="20px"
                width="50%"
                animation="none"
              />
              <q-skeleton height="10px" width="100%" animation="none" />
              <q-skeleton height="10px" width="70%" animation="none" />
              <q-skeleton height="10px" width="20%" animation="none" />
              <q-skeleton
                class="q-mt-xl"
                height="20px"
                width="50%"
                animation="none"
              />
              <q-skeleton height="10px" width="100%" animation="none" />
              <q-skeleton height="10px" width="70%" animation="none" />
              <q-skeleton height="10px" width="20%" animation="none" />
            </template>
          </q-card-section>
        </q-card-section>
      </q-card>
    </template>
  </landing-section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import LandingSection from '@/front/src/components/section-elements/landing-section.vue'
import SectionBgShape from '@/front/src/pages/business/components/common/section-bg-shape.vue'
import SectionGuideContent from '@/front/src/pages/business/components/section-guide/section-guide-content.vue'
import SectionGuideHeader from '@/front/src/pages/business/components/section-guide/section-guide-header.vue'
import SectionInteractiveStepper from '@/front/src/pages/business/components/section-guide/section-interactive-stepper.vue'
import StatsItem from '@/front/src/pages/country/components/the-search-stats/stats-item.vue'

const step = ref(7)
</script>
