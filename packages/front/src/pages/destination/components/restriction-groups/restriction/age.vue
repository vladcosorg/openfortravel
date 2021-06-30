<template>
  <component :is="wrapper" :restriction="restriction">
    <template #title>
      This section only applies to travellers aged
      <b>{{ restriction.options.age }} years old</b> or
      <template v-if="restriction.options.orMore">older</template>
      <template v-else> younger</template>.
    </template>
    <template #subtitle />
  </component>
</template>

<script lang="ts">
import { matPriorityHigh as attentionIcon } from '@quasar/extras/material-icons'
import type { PropType } from '@vue/composition-api'
import { computed, defineComponent, inject } from '@vue/composition-api'

import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'
import type { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { Age } from '@/shared/src/restriction-tree/restriction-node/age'

export default defineComponent({
  components: { CollapsedCountrySequence, TitleCountry },
  mixins: [sharedProps],
  props: {
    restriction: {
      type: Object as PropType<Age>,
      required: true,
    },
    context: {
      type: Number,
      required: false,
    },
  },
  setup() {
    const store = inject(StoreKey) as StoreModule
    const destination = computed(() => store.getters.destination)
    return { destination, attentionIcon }
  },
})
</script>
