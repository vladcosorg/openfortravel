<template>
  <component :is="wrapper" :restriction="restriction">
    <template #title>
      Fill an online-application prior to entry to your destination
    </template>
    <template #subtitle>
      Please
      <a target="_blank" :href="restriction.options.url">follow this link</a> to
      complete the registration form and follow further instructions from that
      page.
    </template>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'
import { OnlineApplication } from '@/shared/src/restriction-tree/restriction-node/online-application'

import type { PropType } from 'vue'

export default defineComponent({
  components: { CollapsedCountrySequence, TitleCountry },
  mixins: [sharedProps],
  props: {
    restriction: {
      type: Object as PropType<OnlineApplication>,
      required: true,
    },
  },
})
</script>
