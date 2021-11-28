<template>
  <landing-section>
    <template #title>
      <span class="text-accent">Instant benefits</span> upon using our platform
    </template>
    <template #subtitle>
      Please fill out the fields below to get information about travel
      restrictions that apply specifically to you
    </template>
    <template #content>
      <div class="grid">
        <benefit-item :icon="integrationIcon">
          <template #icon>
            <img
              class="q-ma-xl"
              svg-inline
              src="./the-benefits-section/rocket-launch.svg"
            />
          </template>
          <template #title>Increased booking rate</template>
          <template #subtitle>
            Please fill out the fields below to get information about travel
            restrictions that apply specifically to you
          </template>
        </benefit-item>
        <benefit-item>
          <template #icon>
            <img
              class="q-ma-xl"
              svg-inline
              src="./the-benefits-section/skills.svg"
          /></template>
          <template #title>Decreased operational costs</template>
          <template #subtitle>
            Please fill out the fields below to get information about travel
            restrictions that apply specifically to you. <br />
            <a class="text-primary" href="">Learn more</a>
          </template>
        </benefit-item>
        <benefit-item :icon="personalizedIcon">
          <template #icon>
            <img
              class="q-ma-xl"
              svg-inline
              src="./the-benefits-section/idea.svg"
            />
          </template>
          <template #title>Safe and informed customers</template>
          <template #subtitle>
            Please fill out the fields below to get information about travel
            restrictions that apply specifically to you
          </template>
        </benefit-item>
      </div>
    </template>
  </landing-section>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: map-get($space-sm, 'x');

  @media (min-width: $breakpoint-sm-min) {
    grid-gap: map-get($space-lg, 'x');
  }
}
</style>

<script lang="ts" setup>
import {
  ionAccessibilitySharp as personalizedIcon,
  ionPaperPlaneOutline as integrationIcon,
} from '@quasar/extras/ionicons-v5'

import LandingSection from '@/front/src/components/section-elements/landing-section.vue'
import BenefitItem from '@/front/src/pages/business/components/the-benefits-section/benefit-item.vue'
</script>
