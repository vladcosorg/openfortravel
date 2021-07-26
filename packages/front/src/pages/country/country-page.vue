<template>
  <inner-page disable-container disable-margins>
    <search-header />
    <search-results />
  </inner-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import InnerPage from '@/front/src/components/inner-page.vue'
import { useContextParser } from '@/front/src/composables/visitor-context-applier'
import SearchHeader from '@/front/src/pages/country/components/search-header.vue'
import SearchResults from '@/front/src/pages/country/components/search-results.vue'
import { useOriginMeta } from '@/front/src/pages/country/country-meta'
import { originParameterTransformers } from '@/front/src/router/route-builders/origin'

export default defineComponent({
  components: {
    SearchHeader,
    SearchResults,
    InnerPage,
  },
  setup() {
    useContextParser(originParameterTransformers)
    useOriginMeta()
  },
})
</script>
