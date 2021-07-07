<template>
  <inner-page disable-container disable-margins>
    <search-header :origin-code="originCode" />
    <search-results :origin-code="originCode" />
  </inner-page>
</template>

<script lang="ts">
import { defineComponent, watch } from '@vue/composition-api'

import InnerPage from '@/front/src/components/inner-page.vue'
import { useSearchIdRouterUpdater } from '@/front/src/composables/search-id'
import SearchHeader from '@/front/src/pages/country/components/search-header.vue'
import SearchResults from '@/front/src/pages/country/components/search-results.vue'
import { meta } from '@/front/src/pages/country/country-meta'
import { useRootStore, useRouter } from '@/shared/src/composables/use-plugins'
import {
  createDestinationRoute,
  createOriginRoute,
} from '@/front/src/router/factory'

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
  setup() {
    watch(
      () => useRootStore().state.searchId,
      (searchId) => {
        const router = useRouter()
        router.push(
          createOriginRoute({
            searchId,
          }),
        )
      },
    )
  },
})
</script>
