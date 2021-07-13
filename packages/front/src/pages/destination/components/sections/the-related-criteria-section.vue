<template>
  <section>
    <widget-header title="Related restrictions" />
    <related-url
      v-for="(link, key) in links"
      :key="key"
      class="text-primary-subtle"
      :title="link.title"
      :label="link.label"
      :url="link.url"
    />
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from '@vue/composition-api'

import RelatedUrl from '@/front/src/pages/destination/components/sections/related-url.vue'
import WidgetHeader from '@/front/src/pages/destination/components/widget-header.vue'
import { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'

export default defineComponent({
  components: { RelatedUrl, WidgetHeader },
  setup() {
    const store = inject(StoreKey) as StoreModule
    const links = computed(() => store.state.relatedURLs)

    // onMounted(store.actions.fetchRelatedURLs)
    // onServerPrefetch(store.actions.fetchRelatedURLs)

    return { links }
  },
})
</script>
