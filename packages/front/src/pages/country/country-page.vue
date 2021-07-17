<template>
  <inner-page disable-container disable-margins>
    <search-header />
    <search-results />
  </inner-page>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'

import InnerPage from '@/front/src/components/inner-page.vue'
import {
  applyContextFromProps,
  contextProps,
} from '@/front/src/composables/visitor-context-applier'
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
    ...contextProps,
    isFallback: {
      type: Boolean,
    },
  },
  setup(props) {
    watch(
      props,
      () => {
        applyContextFromProps(props)
      },
      { immediate: true },
    )
  },
})
</script>
