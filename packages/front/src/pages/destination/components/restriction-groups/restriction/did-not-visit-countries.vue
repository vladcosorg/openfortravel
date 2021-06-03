<template>
  <component :is="wrapper" :restriction="restriction">
    <template v-if="!restriction.options.inverseSelection" #title>
      You did not <b>visit</b> or <b>transited through</b> one of the countries
      below, in the last <b>{{ restriction.options.days }} days</b>
    </template>
    <template v-else #title>
      You did not <b>visit</b> or <b>transited through</b> any of the countries
      <b>except</b> the ones below, in the last
      <b>{{ restriction.options.days }} days</b>
    </template>
    <template v-if="!restriction.options.inverseSelection" #subtitle>
      If you have been in or through any of the countries listed below in the
      previous <b>{{ restriction.options.days }} days</b>, you don't meet the
      entry requirements from this section. <br /><br />
      Banned countries:
      <seq v-slot="{ item }" :items="restriction.options.countryCodes"
        ><country-label :value="item" />
      </seq>
    </template>
    <template v-else #subtitle>
      If you have been in or through any of the countries
      <b>other than the ones</b> listed below in the previous
      <b>{{ restriction.options.days }} days</b>, you don't meet the entry
      requirements from this section. <br /><br />
      Allowed countries:
      <collapsed-country-sequence
        :allowed="restriction.options.countryCodes"
        :focus="context"
      />
    </template>
  </component>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api'
import { defineComponent } from '@vue/composition-api'

import CountryLabel from '@/front/src/components/country/country-label.vue'
import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import Seq from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/seq.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'
import type { DidNotVisitCountries } from '@/shared/src/restriction-tree/restriction-node/did-not-visit-countries'

export default defineComponent({
  components: {
    CountryLabel,
    Seq,
    CollapsedCountrySequence,
    TitleCountry,
  },
  mixins: [sharedProps],
  props: {
    restriction: {
      type: Object as PropType<DidNotVisitCountries>,
      required: true,
    },
  },
})
</script>
