<template>
  <section class="section q-py-xl bg-elevation-1">
    <div class="container q-gutter-y-xl q-my-xl">
      <div class="">
        <h3>Get your business back to the <b>pre-pandemic</b> levels</h3>
        <h6 class="text-primary-subtle">
          Please fill out the fields below to get information about travel
          restrictions that apply specifically to you
        </h6>
      </div>
      <div class="grid">
        <benefit-item :icon="integrationIcon">
          <template #icon>
            <img
              class="q-ma-xl"
              svg-inline
              src="./the-benefits-section/rocket-launch.svg"
            />
          </template>
          <template #title>Quick integration </template>
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
          <template #title> Personalized restrictions </template>
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
          <template #title>AI-assisted advisory updates</template>
          <template #subtitle>
            Please fill out the fields below to get information about travel
            restrictions that apply specifically to you
          </template>
        </benefit-item>
      </div>
    </div>
  </section>
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

<script lang="ts">
import {
  ionAccessibilitySharp as personalizedIcon,
  ionPaperPlaneOutline as integrationIcon,
} from '@quasar/extras/ionicons-v5'
import { defineComponent } from 'vue'

import BenefitItem from '@/front/src/pages/business/components/the-benefits-section/benefit-item.vue'

export default defineComponent({
  components: { BenefitItem },
  props: {},
  setup() {
    return { personalizedIcon, integrationIcon }
  },
})
</script>
