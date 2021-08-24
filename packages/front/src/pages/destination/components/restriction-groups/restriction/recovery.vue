<template>
  <component :is="wrapper" :restriction="restriction">
    <template #title>
      Provide a certificate of having recovered from COVID-19
    </template>
    <template #subtitle>
      <p>
        If you have recovered from coronavirus recently and immune to the
        infection due to antibodies, you can present proof at the border
        control, such as a positive RT-PCR test, hospital discharge ticket, or
        test that proves the presence of IgG antibodies.
      </p>
      <p class="text-accent">
        The certificate must be issued at least
        <b>{{ restriction.options.daysAtLeast }} days</b> and at most
        <b>{{ restriction.options.daysAtMost }} days</b> before arrival.
      </p>

      <required-languages :languages="restriction.options.languages" />

      <issuer-section
        :destination-id="destinationFactsheet.countryCode"
        :issuers="restriction.options.issuer"
      />
    </template>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { DestinationFactsheetKey } from '@/front/src/pages/destination/components/entry-restrictions.vue'
import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import IssuerSection from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/issuer-section.vue'
import RequiredLanguages from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/required-languages.vue'
import Seq from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/seq.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'
import { injectStrict } from '@/shared/src/misc/vue'
import type { RecoveryCertificate } from '@/shared/src/restriction-tree/restriction-node/recovery-certificate'

import type { PropType } from 'vue'

export default defineComponent({
  components: {
    IssuerSection,
    RequiredLanguages,
    Seq,
    CollapsedCountrySequence,
    TitleCountry,
  },
  mixins: [sharedProps],
  props: {
    restriction: {
      type: Object as PropType<RecoveryCertificate>,
      required: true,
    },
  },
  setup() {
    const destinationFactsheet = injectStrict(DestinationFactsheetKey)
    return { destinationFactsheet }
  },
})
</script>
