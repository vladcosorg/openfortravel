<template>
  <inner-page disable-container disable-margins>
    <search-header />
    <search-results />
  </inner-page>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onServerPrefetch, watch } from 'vue'

import InnerPage from '@/front/src/components/inner-page.vue'
import { useContextParser } from '@/front/src/composables/visitor-context-applier'
import SearchHeader from '@/front/src/pages/country/components/search-header.vue'
import SearchResults from '@/front/src/pages/country/components/search-results.vue'
import { useOriginMeta } from '@/front/src/pages/country/country-meta'
import { useCountryStore } from '@/front/src/pages/country/pinia-store'
import { originParameterTransformers } from '@/front/src/router/route-builders/origin'
import { useRootStore } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  components: {
    SearchHeader,
    SearchResults,
    InnerPage,
  },
  setup() {
    const store = useCountryStore()

    onServerPrefetch(async () => {
      await store.fetchAll()
    })
    onBeforeMount(() => store.fetchAll())
    watch(
      () => useRootStore().getters.visitorContextWithDefaults,
      () => store.fetchAll(),
    )

    useContextParser(originParameterTransformers)
    useOriginMeta()
  },
})
</script>
