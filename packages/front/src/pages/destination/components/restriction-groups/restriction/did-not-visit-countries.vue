<template>
  <component :is="wrapper" :restriction="restriction">
    <template v-if="didNotVisitCountries" #title>
      If you did not visit any other country in the last
      <b>{{ restriction.options.days }}</b> days
    </template>
    <template v-else #title>
      If you have been in or through
      <country-label-list :values="matchedCountries" />
      in the last <b>{{ restriction.options.days }}</b> days
    </template>

    <template #subtitle>
      <p>
        Special requirements from this section apply only for the travellers
        that have been in or through any of the countries listed below in the
        last
        <b>{{ restriction.options.days }} days</b>.
      </p>
      <p v-if="restriction.options.matchEmpty">
        Also they apply if you did not visit any country at all in the last
        <b>{{ restriction.options.days }}</b> days.
      </p>

      <p>
        Countries:
        <collapsed-country-sequence
          :allowed="restriction.getCountries()"
          :focus="context"
        />
      </p>
    </template>
  </component>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import intersection from 'lodash/intersection'

import CountryLabelList from '@/front/src/components/country/country-label-list.vue'
import CountryLabel from '@/front/src/components/country/country-label.vue'
import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import Seq from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/seq.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'
import type { DidNotVisitCountries } from '@/shared/src/restriction-tree/restriction-node/did-not-visit-countries'

export default defineComponent({
  components: {
    CountryLabelList,
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
    context: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props) {
    const matchedCountries = computed(() =>
      intersection(props.restriction.getCountries(), props.context),
    )

    const didNotVisitCountries = computed(() => props.context.length === 0)

    return {
      matchedCountries,
      didNotVisitCountries,
    }
  },
})
</script>
