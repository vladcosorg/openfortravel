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
      <span
        v-if="
          restriction.options.hoursBeforeArrival == 0 &&
          restriction.options.hoursAfterArrival > 0
        "
        >after arrival</span
      >
    </template>
    <template
      v-if="
        restriction.options.hoursBeforeArrival > 0 &&
        restriction.options.hoursAfterArrival === 0
      "
      #subtitle
    >
      <p>
        The test has to be issued within
        <b>{{ restriction.options.hoursBeforeArrival }} hours</b>
        <b> before arrival</b>.
      </p>

      <p>
        There is no infromation that the test can be done upon or shortly after
        arrival, thus take into consideration that you may be denied entry or
        quarantine if you did not bring the certificate with you.
      </p>

      <required-languages :languages="restriction.options.languages" />
    </template>
    <template
      v-else-if="
        restriction.options.hoursBeforeArrival > 0 &&
        restriction.options.hoursAfterArrival > 0
      "
      #subtitle
    >
      <p>
        The test has to be issued within
        <b>{{ restriction.options.hoursBeforeArrival }} hours</b>
        <b> before arrival</b>.
      </p>

      <p>
        Alternatively the COVID-19 test can be done within
        <b>{{ restriction.options.hoursAfterArrival }} hours</b> after arrival.
        You have to self-isolate until you receive a negative result.
      </p>

      <required-languages :languages="restriction.options.languages" />
    </template>
    <template
      v-else-if="
        restriction.options.hoursBeforeArrival == 0 &&
        restriction.options.hoursAfterArrival > 0
      "
      #subtitle
    >
      <p>
        The COVID-19 test can be done within
        <b>{{ restriction.options.hoursAfterArrival }} hours</b> after arrival.
        You have to self-isolate until you receive a negative result.
      </p>

      <required-languages :languages="restriction.options.languages" />
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
import { defineComponent } from '@vue/composition-api'

import CovidTestLabel from '@/front/src/components/covid-test-label.vue'
import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import Language from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/language.vue'
import Languages from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/languages.vue'
import RequiredLanguages from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/required-languages.vue'
import Seq from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/seq.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'
import type { PcrTest } from '@/shared/src/restriction-tree/restriction-node/pcr-test'

export default defineComponent({
  components: {
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
})
</script>
