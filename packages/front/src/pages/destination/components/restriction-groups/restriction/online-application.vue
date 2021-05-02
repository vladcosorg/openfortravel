<template>
  <component :is="wrapper">
    <template #title>
      Fill an online-application prior to entry to your destination
    </template>
    <template #subtitle>
      Please
      <a target="_blank" :href="restriction.options.url">follow this link</a> to
      complete the registration form and follow further instructions from that
      page.
    </template>
  </component>
</template>

<style lang="scss" module>
a[href^='#'] {
  color: var(--q-color-primary);
  text-decoration: none;
  border-bottom: 1px dashed var(--q-color-secondary);
}
</style>

<script lang="ts">
import type { PropType } from '@vue/composition-api'
import { computed, defineComponent, inject } from '@vue/composition-api'

import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import Country from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/country.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'
import type { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { OnlineApplication } from '@/shared/src/restriction-tree/restriction-node/online-application'

export default defineComponent({
  components: { Country, CollapsedCountrySequence, TitleCountry },
  mixins: [sharedProps],
  props: {
    restriction: {
      type: Object as PropType<OnlineApplication>,
      required: true,
    },
  },
  setup() {
    const store = inject(StoreKey) as StoreModule
    const destination = computed(() => store.getters.currentDestination)
    return { destination }
  },
})
</script>
