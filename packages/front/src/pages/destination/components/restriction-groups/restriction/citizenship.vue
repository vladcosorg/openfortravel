<template>
  <component :is="template">
    <template #title>
      <span>
        You must be a citizen or a permanent resident of
        <title-country
          :allowed="restriction.getAllowedCountries()"
          :focus="context"
        />
      </span>
    </template>
    <template #subtitle>
      <p>
        Nationals of
        <collapsed-country-sequence
          :allowed="restriction.getAllowedCountries()"
          :focus="context"
        />
        will meet this criteria.
      </p>
      <p>
        Additionally, you meet this criteria if you are a child or a spouse of a
        citizen of <country focused :code="context" /> or any of the countries
        above.
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
import { Citizenship } from '@/shared/src/restriction-tree/restriction-node/citizenship'

export default defineComponent({
  components: { Country, CollapsedCountrySequence, TitleCountry },
  props: {
    restriction: {
      type: Object as PropType<Citizenship>,
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
