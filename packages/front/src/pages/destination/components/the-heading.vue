<template>
  <div class="q-my-xs">
    <div v-if="!isLoading">
      <h1 class="text-h4 q-ma-none">
        Travel restrictions from
        <origin-context-inline /> to
        <destination-context-inline :destination-iso="destinationIso" />
      </h1>
      <h2 class="text-h6 text-primary-subtle" style="font-weight: normal">
        for citizens, nationals and residents of
        <citizenship-context-inline />
        that are
        <vaccination-context-inline />
      </h2>
    </div>
    <h5 v-else>
      <q-skeleton class="inline-block" type="text" width="80%" />
    </h5>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from '@vue/composition-api'

import CitizenshipContextInline from '@/front/src/components/context-field/citizenship/citizenship-context-inline.vue'
import OriginContextInline from '@/front/src/components/context-field/origin/origin-context-inline.vue'
import VaccinationContextInline from '@/front/src/components/context-field/vaccination/vaccination-context-inline.vue'
import DestinationContextInline from '@/front/src/pages/destination/components/destination-context-inline.vue'
import { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'

export default defineComponent({
  components: {
    DestinationContextInline,
    OriginContextInline,
    VaccinationContextInline,
    CitizenshipContextInline,
  },
  props: {
    isLoading: {
      type: Boolean,
    },
  },
  setup() {
    const store = inject(StoreKey) as StoreModule
    const destinationIso = computed(() => store.state.currentDestinationCode)
    return {
      destinationIso,
    }
  },
})
</script>
