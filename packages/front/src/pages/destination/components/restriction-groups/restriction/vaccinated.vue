<template>
  <component :is="wrapper" :restriction="restriction">
    <template #title>Bring your certificate of vaccination</template>
    <template #subtitle>
      <p>
        You must provide proof of having received the full course of vaccination
        with an approved vaccine against COVID-19. In the case of most vaccines,
        vaccination consists of 2 doses - people who have only taken the first
        dose are in the process of vaccination and are not yet fully vaccinated.
      </p>
      <p v-if="restriction.options.authorizedBrands.length">
        Currently <country-label :value="destinationId" /> only accepts visitors
        vaccinated with the vaccine of the following brands:
        <seq v-slot="{ item }" :items="restriction.options.authorizedBrands">
          <vaccine :id="item" /> </seq
        >.
      </p>

      <p v-if="restriction.options.daysAgo">
        Another requirement is that your last dose of vaccine must have been
        received at least <b>{{ restriction.options.daysAgo }} days</b> prior to
        your arrival.
      </p>
      <required-languages :languages="restriction.options.languages" />

      <issuer-section
        :destination-id="destinationId"
        :issuers="restriction.options.issuer"
      />
    </template>

    <template #reason>
      <div v-if="restriction.matches(context)">
        You've <span class="text-positive">matched</span> this requirement
        because you've mentioned that you are <b>vaccinated</b>
      </div>
      <div v-else>
        You've <span class="text-negative">didn't match</span> this requirement
        because you've mentioned that you are <b>not vaccinated</b>
      </div>
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
import { computed, defineComponent, inject } from '@vue/composition-api'

import CountryLabel from '@/front/src/components/country/country-label.vue'
import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import IssuerSection from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/issuer-section.vue'
import Language from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/language.vue'
import Languages from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/languages.vue'
import RequiredLanguages from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/required-languages.vue'
import Seq from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/seq.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import Vaccine from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/vaccine/vaccine.vue'
import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'
import type { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import type { Vaccinated } from '@/shared/src/restriction-tree/restriction-node/vaccinated'

export default defineComponent({
  components: {
    IssuerSection,
    CountryLabel,
    RequiredLanguages,
    Vaccine,
    Seq,
    Languages,
    Language,
    CollapsedCountrySequence,
    TitleCountry,
  },
  mixins: [sharedProps],
  props: {
    restriction: {
      type: Object as PropType<Vaccinated>,
      required: true,
    },
  },
  setup() {
    const store = inject(StoreKey) as StoreModule
    const destinationId = computed(() => store.state.currentDestinationCode)
    return { destinationId }
  },
})
</script>
