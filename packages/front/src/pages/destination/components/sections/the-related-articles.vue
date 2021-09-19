<template>
  <section>
    <widget-header title="Related articles" />
    <div class="row q-gutter-sm">
      <card-for-vaccinated :origin-iso="originIso" />
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

import CardForVaccinated from '@/front/src/components/card/card-for-vaccinated.vue'
import WidgetHeader from '@/front/src/pages/destination/components/widget-header.vue'
import { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'

export default defineComponent({
  components: { CardForVaccinated, WidgetHeader },
  setup() {
    const store = inject(StoreKey) as StoreModule
    const originIso = computed(() => store.getters.currentOriginCode)

    return { originIso }
  },
})
</script>
