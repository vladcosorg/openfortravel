<template>
  <component :is="wrapper" :restriction="restriction">
    <template #title
      >Bring the <b>EU Digital COVID Certificate</b> with you</template
    >
    <template #subtitle>
      <p>
        The <b>EU Digital COVID Certificate</b> (EUDCC) - previously called the
        Digital Green Certificate - aims to help Europeans travel easily between
        the 27 member states.
      </p>
      <p>
        To obtain the EUDCC, it is necessary to meet the requirements for
        vaccination, recovery, or testing negative. Each country is issuing
        certificates via its own channels and apps created in collaboration with
        the European Commission.
      </p>
    </template>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import IssuerSection from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/issuer-section.vue'
import RequiredLanguages from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/required-languages.vue'
import Seq from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/seq.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'
import type { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
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
    const store = inject(StoreKey) as StoreModule
    const destinationId = computed(() => store.getters.currentDestinationCode)
    return { destinationId }
  },
})
</script>
