<template>
  <component :is="wrapper">
    <template #title>
      Make sure that in the last {{ restriction.options.days }} days you did not
      visit the countries from the red list
    </template>
    <template #subtitle>
      {{ restriction.options.countryCodes }}
      If you have been in or through any of the countries listed below in the
      previous {days} days, you don't meet the entry requirements from this
      section. <br /><br />
      Banned countries:
      <seq v-slot="{ code }" :items="restriction.options.countryCodes"
        ><country :code="code" />
      </seq>
    </template>
  </component>
</template>

<script lang="ts">
import { matWarning as notMatchedIcon } from '@quasar/extras/material-icons'
import {
  computed,
  defineComponent,
  inject,
  PropType,
} from '@vue/composition-api'

import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import Country from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/country.vue'
import Seq from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/seq.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'
import { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { DidNotVisitCountries } from '@/shared/src/restriction-tree/restriction-node/did-not-visit-countries'

export default defineComponent({
  components: { Seq, Country, CollapsedCountrySequence, TitleCountry },
  mixins: [sharedProps],
  props: {
    restriction: {
      type: Object as PropType<DidNotVisitCountries>,
      required: true,
    },
  },
  setup() {
    const store = inject(StoreKey) as StoreModule
    const destination = computed(() => store.getters.currentDestination)
    return { destination, notMatchedIcon }
  },
})
</script>
