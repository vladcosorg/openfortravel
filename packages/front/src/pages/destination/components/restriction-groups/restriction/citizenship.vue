<template>
  <component :is="wrapper">
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
        citizen of <country focused :code="context" /> of any of the countries
        above.
      </p>
    </template>
    <template #reason>
      <div v-if="restriction.matches(context)">
        You've <span class="text-positive">matched</span> this because you've
        selected <country :code="context" /> as your departure country
      </div>
      <div v-else>
        You <span class="text-negative">didn't match</span> this because you've
        selected <country :code="context" /> as your departure country and it is
        not in the list
      </div>
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
import type {
  PropType} from '@vue/composition-api';
import {
  computed,
  defineComponent,
  inject
} from '@vue/composition-api'

import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import Country from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/country.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'
import type { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import type { Citizenship } from '@/shared/src/restriction-tree/restriction-node/citizenship'

export default defineComponent({
  components: { Country, CollapsedCountrySequence, TitleCountry },
  mixins: [sharedProps],
  props: {
    restriction: {
      type: Object as PropType<Citizenship>,
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
