<template>
  <component :is="wrapper" :restriction="restriction">
    <template #title>
      <i18n-l
        :keypath="`page.destination.rs.test.title.${titleI18nId}`"
        tag="span"
      >
        <template #type="{ innerContent }">
          {{ innerContent }}
          <seq
            v-slot="{ item }"
            :items="restriction.getFormattedTypes()"
            conjunction="or"
          >
            <covid-test-label :value="item" />
          </seq>
        </template>
        <template #hours>
          {{ hours }}
        </template>
      </i18n-l>
    </template>

    <template #subtitle>
      <i18n-l :keypath="`page.destination.rs.test.body.${titleI18nId}`" tag="p">
        <template #hours>
          {{ hours }}
        </template>
      </i18n-l>
      <i18n-l keypath="page.destination.rs.test.body.acceptedTests" tag="p">
        <template #types>
          <seq
            v-slot="{ item }"
            :items="restriction.getFormattedTypes()"
            conjunction="or"
          >
            <covid-test-label :value="item" />
          </seq>
        </template>
      </i18n-l>

      <required-languages :languages="restriction.options.languages" />

      <issuer-section
        :destination-id="destinationFactsheet.countryCode"
        :issuers="restriction.options.issuer"
      />
    </template>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import CovidTestLabel from '@/front/src/components/covid-test-label.vue'
import IssuerList from '@/front/src/components/issuer-list.vue'
import I18nL from '@/front/src/modules/i18n/i18n-l.vue'
import { DestinationFactsheetKey } from '@/front/src/pages/destination/components/entry-restrictions.vue'
import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import IssuerSection from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/issuer-section.vue'
import Language from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/language.vue'
import Languages from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/languages.vue'
import RequiredLanguages from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/required-languages.vue'
import Seq from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/seq.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'
import { injectStrict } from '@/shared/src/misc/vue'
import type { PcrTest } from '@/shared/src/restriction-tree/restriction-node/pcr-test'

import type { PropType } from 'vue'

export default defineComponent({
  components: {
    I18nL,
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
  setup(props) {
    const destinationFactsheet = injectStrict(DestinationFactsheetKey)
    const titleI18nId = computed(() => {
      if (props.restriction.options.beforeArrival) {
        return 'beforeArrival'
      }

      if (props.restriction.options.hoursBeforeArrival > 0) {
        return 'afterArrival'
      }

      return 'atArrival'
    })
    const hours = computed(() => {
      if (props.restriction.options.beforeArrival) {
        return props.restriction.options.hoursBeforeArrival ?? 72
      }

      return 0
    })
    return { destinationFactsheet, titleI18nId, hours }
  },
})
</script>
