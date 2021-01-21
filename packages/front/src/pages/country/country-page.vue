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
import { useComputedMemorized } from '@/shared/src/composables/use-computed-vmodel'

export default defineComponent({
  meta,
  components: {
    SearchResults,
    TheSearchHeader,
    InnerPage,
  },
  props: {
    unsafeOriginCode: {
      type: String,
    },
    isFallback: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const originCodeRef = useComputedMemorized(() => props.unsafeOriginCode)

    return {
      originCode: originCodeRef,
    }
  },
})
</script>
