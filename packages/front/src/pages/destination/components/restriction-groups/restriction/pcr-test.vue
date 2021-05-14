<template>
  <component :is="wrapper" :restriction="restriction">
    <template #title>
      <span>Get a negative COVID-19 <b>PCR test</b> certificate</span>
    </template>
    <template #subtitle>
      <p>
        The test has to be issued within
        <b>{{ restriction.options.hours }} hours</b>
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

import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import Country from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/country.vue'
import Language from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/language.vue'
import Languages from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/languages.vue'
import RequiredLanguages from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/required-languages.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'
import type { PcrTest } from '@/shared/src/restriction-tree/restriction-node/pcr-test'

export default defineComponent({
  components: {
    RequiredLanguages,
    Languages,
    Language,
    Country,
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
