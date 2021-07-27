<template>
  <p>
    Currently, <country-label :value="destinationId" /> accepts this document,
    if it is issued by <issuer-list :values="issuers" />.
  </p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import CountryLabel from '@/front/src/components/country/country-label.vue'
import IssuerList from '@/front/src/components/issuer-list.vue'

export default defineComponent({
  components: { IssuerList, CountryLabel },

  props: {
    issuers: {
      type: Array as PropType<string[]>,
      required: true,
    },
    destinationId: {
      type: String,
      required: true,
    },
  },
})
</script>
