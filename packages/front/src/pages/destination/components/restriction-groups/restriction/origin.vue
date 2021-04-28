<template>
  <component :is="template">
    <template #title>
      <span>
        You must arrive from
        <title-country
          :allowed="restriction.getAllowedCountries()"
          :focus="context"
        />
      </span>
    </template>
    <template #subtitle>
      <p>
        You must arrive to your destination from
        <collapsed-country-sequence
          :allowed="restriction.getAllowedCountries()"
          :focus="context"
        />.
      </p>
      <p>
        Arriving to <country focused :code="destination.countryCode" /> from any
        other country except the ones listed above, may subject you to
        additional restrictions, such as quarantine or even denial of entry.
      </p>
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
import {
  computed,
  defineComponent,
  inject,
  PropType,
} from '@vue/composition-api'

import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import Country from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/country.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { Origin } from '@/shared/src/restriction-tree/restriction-node/origin'

export default defineComponent({
  components: { Country, CollapsedCountrySequence, TitleCountry },
  props: {
    restriction: {
      type: Object as PropType<Origin>,
      required: true,
    },
    context: {},
    template: {},
  },
  setup() {
    const store = inject(StoreKey) as StoreModule
    const destination = computed(() => store.getters.currentDestination)
    return { destination }
  },
})
</script>
