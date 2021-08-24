<template>
  <component :is="wrapper" :restriction="restriction">
    <template #title>
      <span>
        You need to arrive directly from
        <country-label regular focused :value="context" />
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
        Arriving to
        <country-label focused regular :value="destination.countryCode" /> from
        any other country except the one above, may subject you to additional
        restrictions, such as quarantine or even denial of entry.
      </p>
    </template>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import CountryLabel from '@/front/src/components/country/country-label.vue'
import { DestinationFactsheetKey } from '@/front/src/pages/destination/components/entry-restrictions.vue'
import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'
import { injectStrict } from '@/shared/src/misc/vue'
import type { Origin } from '@/shared/src/restriction-tree/restriction-node/origin'

import type { PropType } from 'vue'

export default defineComponent({
  components: { CountryLabel, CollapsedCountrySequence, TitleCountry },
  mixins: [sharedProps],
  props: {
    restriction: {
      type: Object as PropType<Origin>,
      required: true,
    },
  },
  setup() {
    const destination = injectStrict(DestinationFactsheetKey)
    return { destination }
  },
})
</script>
