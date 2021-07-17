<template>
  <section>
    <widget-header title="Related restrictions" />
    <div class="row q-gutter-sm">
      <q-btn
        v-for="(link, key) in links"
        :key="key"
        type="a"
        no-caps
        unelevated
        color="elevation-1"
        :title="link.title"
        :to="link.url"
        :label="link.label"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

import { useLinks } from '@/front/src/pages/destination/components/sections/composables'
import WidgetHeader from '@/front/src/pages/destination/components/widget-header.vue'
import { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'

export default defineComponent({
  components: { WidgetHeader },
  setup() {
    const store = inject(StoreKey) as StoreModule
    const links = useLinks(computed(() => store.state.currentDestinationCode))

    return { links }
  },
})
</script>
