<template>
  <inner-page disable-container disable-margins>
    <the-search-header :origin-code="originCode" />
    <search-results :origin-code="originCode" />
  </inner-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import InnerPage from '@/front/src/components/inner-page.vue'
import TheSearchHeader from '@/front/src/layouts/components/the-search-header.vue'
import SearchResults from '@/front/src/pages/country/components/search-results.vue'
import { meta } from '@/front/src/pages/country/country-meta'

export default defineComponent({
  meta,
  components: {
    SearchResults,
    TheSearchHeader,
    InnerPage,
  },
  props: {
    originCode: {
      type: String,
      required: true,
    },
    isFallback: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
