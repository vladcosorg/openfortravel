<template>
  <component :is="wrapper" :restriction="restriction">
    <template v-if="!restriction.options.earlyReleaseDays" #title>
      Self-isolate for <b>{{ restriction.options.days }} days</b> upon arrival
    </template>

    <template v-else #title>
      Self-isolate for
      <b>at least {{ restriction.options.earlyReleaseDays }} days</b> upon
      arrival
    </template>
    <template #subtitle>
      <p>
        Travelers are subject to <b>{{ restriction.options.days }} days</b> of
        mandatory self-isolation at home, declared location or location
        designated by authorities.
      </p>
      <p v-if="restriction.options.earlyReleaseDays">
        The quarantine period may be shortened by taking another test during the
        self-isolation. If the result of this test is negative,
        <b
          >the period of quarantine can end on day
          {{ restriction.options.earlyReleaseDays }}.</b
        >
      </p>
      <p v-else>
        You have to self-isolate for the full duration ({{
          restriction.options.days
        }}
        days) and it is not possible to end the quarantine early by taking a
        repeated test.
      </p>
    </template>
  </component>
</template>

<script lang="ts">
import type { Quarantine } from '@/shared/src/restriction-tree/restriction-node/quarantine'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import Language from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/language.vue'
import Languages from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/languages.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'

export default defineComponent({
  components: {
    Languages,
    Language,
    CollapsedCountrySequence,
    TitleCountry,
  },
  mixins: [sharedProps],
  props: {
    restriction: {
      type: Object as PropType<Quarantine>,
      required: true,
    },
  },
})
</script>
