<template>
  <section v-intersection.once="onIntersection" class="stats q-py-xl">
    <div class="container q-my-sm-xl">
      <div class="q-mb-sm-xl q-pb-xl text-center">
        <h3 class="text-bold">
          {{ $t('page.index.sections.stats.title') }}<br />
          <origin-context-inline />
        </h3>
        <h5 class="text-subtitle1">
          {{ $t('page.index.sections.stats.subtitle') }}
        </h5>
      </div>
      <div v-if="$q.platform.is.desktop && loadMap">
        <section-map
          class="q-mb-xl"
          :origin-code="originISO"
          :restrictions="data"
          :is-loading="false"
        />
      </div>

      <div
        :class="[
          'row q-col-gutter-x-xl q-col-gutter-sm-x-md q-col-gutter-y-sm items-stretch',
        ]"
      >
        <div
          v-for="category in stats"
          :key="category.title"
          class="col-lg col-sm-4 col-12 wrap"
        >
          <div
            class="q-px-md q-py-lg rounded-borders fit"
            style="background-color: #39579d"
          >
            <h6>{{ category.title }}</h6>

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
                {{ category.value }}
              </span>
              <span class="lh-base" v-html="category.valueSuffix" />
            </div>
            <div class="q-mb-md">
              {{ category.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.stats {
  //background-color: #272f56;
  @media (min-width: $breakpoint-md-min) {
    background-image: url('../../../assets/stats.svg');
    background-repeat: repeat-x;
    background-position: bottom;
    background-size: auto 30%;
  }
}
</style>

<script lang="ts">
import { asyncComputed } from '@vueuse/core'
import { defineComponent, ref } from 'vue'

import OriginContextInline from '@/front/src/components/context-field/origin/origin-context-inline.vue'
import SectionMap from '@/front/src/pages/index/components/section-map.vue'
import { useStats } from '@/front/src/pages/index/index-composable'
import { fetchOverview } from '@/shared/src/api/cfapi/overview'
import { useRootStore } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  components: {
    OriginContextInline,
    SectionMap,
  },
  setup() {
    const loadMap = ref(false)
    const originISO = useRootStore().getters.visitorOrigin
    const onIntersection = (entry: IntersectionObserverEntry) => {
      if (!entry.isIntersecting) {
        return
      }
      loadMap.value = true
    }

    const data = asyncComputed(async () => {
      if (!loadMap.value) {
        return {}
      }
      return await fetchOverview(
        useRootStore().getters.visitorContextWithDefaults,
      )
    }, {})

    const stats = useStats(data)
    return { stats, loadMap, originISO, onIntersection, data }
  },
})
</script>
