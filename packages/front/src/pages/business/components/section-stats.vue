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
        <section-map class="q-mb-xl" :restrictions="data" />
      </div>

      <the-stats-container :trips="data" />
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
import SectionMap from '@/front/src/pages/index/components/the-stats-section/section-map.vue'
import TheStatsContainer from '@/front/src/pages/index/components/the-stats-section/the-stats-container.vue'
import { fetchOverview } from '@/shared/src/api/function-api/overview'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { createRoundTripCollectionFromRawRestrictions } from '@/shared/src/models/trip/factory'

export default defineComponent({
  components: {
    TheStatsContainer,
    OriginContextInline,
    SectionMap,
  },
  setup() {
    const loadMap = ref(false)
    const onIntersection = (entry: IntersectionObserverEntry) => {
      if (!entry.isIntersecting) {
        return
      }
      loadMap.value = true
    }

    const data = asyncComputed(async () => {
      if (!loadMap.value) {
        return []
      }

      return createRoundTripCollectionFromRawRestrictions(
        useRootStore().getters.visitorContextWithDefaults.origin,
        await fetchOverview(useRootStore().getters.visitorContextWithDefaults),
      )
    }, [])

    return { loadMap, onIntersection, data }
  },
})
</script>
