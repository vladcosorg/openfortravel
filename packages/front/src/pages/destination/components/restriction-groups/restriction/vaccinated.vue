<template>
  <component :is="wrapper">
    <template #title>Bring your certificate of vaccination</template>
    <template #subtitle>
      <p>
        You must provide proof of having received the full course of vaccination
        with an approved vaccine against COVID-19. In the case of most vaccines,
        vaccination consists of 2 doses - people who have only taken the first
        dose are in the process of vaccination and are not yet fully vaccinated.
      </p>
      <p v-if="restriction.options.authorizedBrands.length">
        Currently <country :code="destination.countryCode" /> only accepts
        visitors vaccinated with the vaccine of the following brands:
        <seq v-slot="{ item }" :items="restriction.options.authorizedBrands">
          <vaccine :id="item" /> </seq
        >.
      </p>

      <p v-if="restriction.options.daysAgo">
        Another requirement is that your last dose of vaccine must have been
        received at least <b>{{ restriction.options.daysAgo }} days</b> prior to
        your arrival.
      </p>
      <p v-if="restriction.options.languages.length">
        A valid vaccination certificate must be presented in
        <seq v-slot="{ item }" :items="restriction.options.languages">
          <language :code="item" /> </seq
        >.
      </p>
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
import {
  computed,
  defineComponent,
  inject,
  PropType,
} from '@vue/composition-api'

import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import Country from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/country.vue'
import Language from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/language.vue'
import Languages from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/languages.vue'
import Seq from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/seq.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import Vaccine from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/vaccine/vaccine.vue'
import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'
import { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { Vaccinated } from '@/shared/src/restriction-tree/restriction-node/vaccinated'

export default defineComponent({
  components: {
    Vaccine,
    Seq,
    Languages,
    Language,
    Country,
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
    const destination = computed(() => store.getters.currentDestination)
    return { destination }
  },
})
</script>
