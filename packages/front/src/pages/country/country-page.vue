<template>
  <inner-page disable-container disable-margins>
    <search-header :origin-code="originSlug" />
    <search-results :origin-code="originSlug" />
  </inner-page>
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from '@vue/composition-api'

import InnerPage from '@/front/src/components/inner-page.vue'
import { applyContextFromProps } from '@/front/src/composables/visitor-context-applier'
import SearchHeader from '@/front/src/pages/country/components/search-header.vue'
import SearchResults from '@/front/src/pages/country/components/search-results.vue'
import { meta } from '@/front/src/pages/country/country-meta'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

export default defineComponent({
  meta,
  components: {
    SearchHeader,
    SearchResults,
    InnerPage,
  },
  props: {
    // eslint-disable-next-line vue/no-unused-properties
    originSlug: {
      type: String as PropType<VisitorProfile[RestrictionNodeType.ORIGIN]>,
      required: true,
    },
    // eslint-disable-next-line vue/no-unused-properties
    citizenship: {
      type: Array as PropType<VisitorProfile[RestrictionNodeType.CITIZENSHIP]>,
      required: true,
    },
    // eslint-disable-next-line vue/no-unused-properties
    vaccinated: {
      type: Object as PropType<VisitorProfile[RestrictionNodeType.VACCINATED]>,
    },
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
