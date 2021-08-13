<template>
  <component :is="wrapper" :restriction="restriction">
    <template #title>
      You are a citizen or a permanent resident of
      <title-country
        :focus="context"
        :allowed="restriction.getAllowedCountries()"
      />
    </template>
    <template #subtitle>
      <p>
        Nationals of
        <collapsed-country-sequence
          :allowed="restriction.getAllowedCountries()"
          :focus="context"
        />
        will meet this criteria.
      </p>
      <p>
        Additionally, you meet this criteria if you are a child or a spouse of a
        citizen of one of the countries above.
      </p>
    </template>
    <template #reason>
      <div v-if="restriction.matches(context)">
        You've <span class="text-positive">matched</span> this because you've
        selected
        <country-label-list
          :values="restriction.getMatchingAllowedCountries(context)"
        />
        as your citizenship or residence
      </div>
      <div v-else>
        You <span class="text-negative">didn't match</span> this because you've
        selected <country-label-list :values="context" /> as your departure
        country and it is not in the list
      </div>
    </template>
  </component>
</template>

<script lang="ts">
import type { Citizenship } from '@/shared/src/restriction-tree/restriction-node/citizenship'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

import CountryLabelList from '@/front/src/components/country/country-label-list.vue'
import CountryLabel from '@/front/src/components/country/country-label.vue'
import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'

export default defineComponent({
  components: {
    CountryLabelList,
    CountryLabel,
    CollapsedCountrySequence,
    TitleCountry,
  },
  mixins: [sharedProps],
  props: {
    restriction: {
      type: Object as PropType<Citizenship>,
      required: true,
    },
  },
})
</script>
