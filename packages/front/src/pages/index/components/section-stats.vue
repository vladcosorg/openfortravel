<template>
  <section :class="`${$style.stats} q-py-xl`">
    <div class="container q-my-sm-xl">
      <div class="q-mb-sm-xl q-pb-xl text-center">
        <h3 class="text-bold">
          {{ $t('page.index.sections.stats.title') }}
        </h3>
        <h5 class="text-subtitle1">
          Countries include sovereign states, overseas terriotories
        </h5>
      </div>
      <lazy-hydrate
        v-if="$q.platform.is.desktop"
        never
        :trigger-hydration="loadMap"
      >
        <section-map
          class="q-mb-xl"
          :origin-code="originCode"
          :restrictions="restrictions"
        />
      </lazy-hydrate>

      <div :class="['row q-col-gutter-xl items-stretch', $style.data]">
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
    background-size: auto 30%;
  }
}
</style>

<script lang="ts">
import { defineComponent, onMounted, ref, toRef } from '@vue/composition-api'
import { hydrateWhenVisible } from 'vue-lazy-hydration'

import { useGroupedDestinations } from '@/front/src/pages/country/composable'
import { useStats } from '@/front/src/pages/index/index-composable'

export default defineComponent({
  components: {
    SectionMap: () =>
      import(
        /* webpackChunkName: "map-comp" */ '@/front/src/pages/index/components/section-map.vue'
      ),
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
    const loadMap = ref(false)
    const {
      destinationsRef: restrictions,
      isLoadingRef: isLoading,
    } = useGroupedDestinations(toRef(props, 'originCode'))

    onMounted(() => {
      const scrollHandler = function () {
        loadMap.value = true
        window.removeEventListener('scroll', scrollHandler, false)
      }
      window.addEventListener('scroll', scrollHandler, false)
    })

    const stats = useStats(restrictions)
    return { stats, isLoading, restrictions, loadMap }
  },
})
</script>
