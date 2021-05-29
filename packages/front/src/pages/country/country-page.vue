<template>
  <inner-page disable-container disable-margins>
    <search-header :origin-code="originCode" />
    <search-results :origin-code="originCode" />
  </inner-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

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
  props: {
    originCode: {
      type: String,
      required: true,
    },
    isFallback: {
      type: Boolean,
    },
  },
})
</script>
