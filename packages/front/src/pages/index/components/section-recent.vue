<template>
  <section :class="`${$style.stats} q-py-xl`">
    <div class="container q-my-sm-xl">
      <h3 class="text-center q-mb-sm-xl q-pb-xl">
        {{ $t('page.index.sections.stats.title') }}
      </h3>

      <div class="row q-col-gutter-xl items-stretch">
        <div
          v-for="category in stats"
          :key="category.title"
          class="col-lg col-sm-6 col-12 wrap"
        >
          <div
            class="column q-px-md q-py-lg rounded-borders fit"
            style="background-color: #39579d"
          >
            <h6>{{ category.title }}</h6>
            <div class="q-mb-md text-primary-subtle">
              {{ category.description }}
            </div>
            <div
              :class="[
                'lh-1 q-pa-md q-mb-sm text-primary-inverse rounded-borders',
                category.colorClass,
              ]"
              :style="{
                marginTop: 'auto',
                marginLeft: '-16px',
                borderTopLeftRadius: '0px',
                borderBottomLeftRadius: '0px',
              }"
            >
              <span class="text-h1 block lh-1" style="font-weight: bold">
                <count-up
                  :end-val="category.value"
                  :delay="1"
                  :options="{ duration: 1 }"
                />
              </span>
              <span class="lh-base" v-html="category.valueSuffix" />
            </div>
            {{ $t('page.index.sections.stats.noChanges') }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" module>
.stats {
  background-color: #272f56;
  @media (min-width: $breakpoint-md-min) {
    background-image: url('../../../assets/stats.svg');
    background-repeat: repeat-x;
    background-position: bottom;
    background-size: auto 60%;
  }
}
</style>

<script lang="ts">
import { defineComponent, toRef } from 'vue'
import { hydrateWhenVisible } from 'vue-lazy-hydration'

import { useGroupedDestinations } from '@/front/src/pages/country/composable'
import { useStats } from '@/front/src/pages/index/index-composable'

export default defineComponent({
  components: {
    CountUp: hydrateWhenVisible(
      () => import(/* webpackChunkName: "countup" */ 'vue-countup-v2'),
    ),
  },
  props: {
    originCode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { destinationsRef: destinations, isLoadingRef: isLoading } =
      useGroupedDestinations(toRef(props, 'originCode'))

    const stats = useStats(destinations)
    return { stats, isLoading }
  },
})
</script>
