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
    </template>
  </component>
</template>

<script lang="ts">
import { matWarning as notMatchedIcon } from '@quasar/extras/material-icons'
import type { PropType } from '@vue/composition-api'
import { computed, defineComponent, inject } from '@vue/composition-api'

import Country from '@/front/src/components/country.vue'
import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import RequiredLanguages from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/required-languages.vue'
import Seq from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/seq.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'
import type { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import type { RecoveryCertificate } from '@/shared/src/restriction-tree/restriction-node/recovery-certificate'

export default defineComponent({
  components: {
    RequiredLanguages,
    Seq,
    Country,
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
    const store = inject(StoreKey) as StoreModule
    const destination = computed(() => store.getters.destination)
    return { destination, notMatchedIcon }
  },
})
</script>
