<template>
  <component :is="wrapper" :restriction="restriction">
    <template #title>
      <div class="row items-center">
        <q-icon
          color="negative"
          class="col-auto"
          :name="attentionIcon"
          size="lg"
        />
        <span class="col">
          These restrictions only apply if you are travelling to
          <seq
            v-slot="{ item }"
            :items="restriction.options.subDestinations"
            conjunction="or"
          >
            <country-label skip-mapping :value="item" />
          </seq>
        </span>
      </div>
    </template>
    <template #subtitle>
      <p>Please see other sections if you are travelling to any other place</p>
    </template>
  </component>
</template>

<script lang="ts">
import { SubDestination } from '@/shared/src/restriction-tree/restriction-node/sub-destination'
import { matPriorityHigh as attentionIcon } from '@quasar/extras/material-icons'
import type { PropType } from 'vue'
import { computed, defineComponent, inject } from 'vue'

import CountryLabel from '@/front/src/components/country/country-label.vue'
import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import Seq from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/seq.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'
import type { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'

export default defineComponent({
  components: { Seq, CountryLabel, CollapsedCountrySequence, TitleCountry },
  mixins: [sharedProps],
  props: {
    restriction: {
      type: Object as PropType<SubDestination>,
      required: true,
    },
  },
  setup() {
    const store = inject(StoreKey) as StoreModule
    const destination = computed(() => store.getters.destination)
    return { destination, attentionIcon }
  },
})
</script>
