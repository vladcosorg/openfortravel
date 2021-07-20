<template>
  <inner-page disable-container disable-margins>
    <search-header />
    <search-results />
  </inner-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import InnerPage from '@/front/src/components/inner-page.vue'
import SearchHeader from '@/front/src/pages/country/components/search-header.vue'
import SearchResults from '@/front/src/pages/country/components/search-results.vue'
import { meta } from '@/front/src/pages/country/country-meta'

export default defineComponent({
  meta,
  components: {
    SearchHeader,
    SearchResults,
    InnerPage,
  },
  setup() {},
})
</script>
