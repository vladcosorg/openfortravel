<template>
  <component :is="wrapper" :restriction="restriction">
    <template #title>
      Get a negative COVID-19
      <seq
        v-slot="{ item }"
        :items="restriction.getFormattedTypes()"
        conjunction="or"
      >
        <covid-test-label :value="item" />
      </seq>
      test certificate

      <template v-if="restriction.options.beforeArrival">
        <b v-if="restriction.options.beforeArrival > 0">
          at most {{ restriction.options.hoursBeforeArrival }}h before
          arrival</b
        >
        <b v-else> at most 72h before arrival</b>
      </template>
      <template v-else>
        <b v-if="restriction.options.hoursBeforeArrival > 0"
          >within {{ restriction.options.hoursBeforeArrival }}h after arrival</b
        >
        <b v-else>at the airport after arrival</b>
      </template>
    </template>

    <template #subtitle>
      <p>
        The COVID-19 test has to be performed
        <template v-if="restriction.options.beforeArrival">
          <b v-if="restriction.options.beforeArrival > 0">
            at most {{ restriction.options.hoursBeforeArrival }}h before
            arrival</b
          >
          <b v-else> at most 72h before arrival</b>
        </template>
        <template v-else>
          <b v-if="restriction.options.hoursBeforeArrival > 0"
            >within {{ restriction.options.hoursBeforeArrival }} hours after
            arrival</b
          >
          <b v-else>at the airport after arrival</b>
          . You have to self-isolate until you receive a negative result.
        </template>
      </p>

      <p>
        Accepted tests:
        <seq
          v-slot="{ item }"
          :items="restriction.getFormattedTypes()"
          conjunction="or"
        >
          <covid-test-label :value="item" />
        </seq>
      </p>
      <required-languages :languages="restriction.options.languages" />

      <issuer-section
        :destination-id="destinationId"
        :issuers="restriction.options.issuer"
      />
    </template>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

import CovidTestLabel from '@/front/src/components/covid-test-label.vue'
import IssuerList from '@/front/src/components/issuer-list.vue'
import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import IssuerSection from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/issuer-section.vue'
import Language from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/language.vue'
import Languages from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/languages.vue'
import RequiredLanguages from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/required-languages.vue'
import Seq from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/seq.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'
import { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import type { PcrTest } from '@/shared/src/restriction-tree/restriction-node/pcr-test'

import type { PropType } from 'vue'

export default defineComponent({
  components: {
    IssuerSection,
    IssuerList,
    CovidTestLabel,
    Seq,
    RequiredLanguages,
    Languages,
    Language,
    CollapsedCountrySequence,
    TitleCountry,
  },
  mixins: [sharedProps],
  props: {
    restriction: {
      type: Object as PropType<PcrTest>,
      required: true,
    },
  },
  setup() {
    const store = inject(StoreKey) as StoreModule
    const destinationId = computed(() => store.getters.currentDestinationCode)
    return { destinationId }
  },
})
</script>
