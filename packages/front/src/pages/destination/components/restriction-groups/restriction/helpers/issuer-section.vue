<template>
  <i18n-l
    v-if="issuers && issuers.length > 0"
    keypath="components.issuerSection.yes"
    tag="p"
  >
    <template #country>
      <country-label :value="destinationId" />
    </template>
    <template #issuers>
      <issuer-list :values="issuers" />
    </template>
  </i18n-l>
  <i18n-l v-else keypath="components.issuerSection.no" tag="p">
    <template #country>
      <country-label :value="destinationId" />
    </template>
  </i18n-l>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import CountryLabel from '@/front/src/components/country/country-label.vue'
import IssuerList from '@/front/src/components/issuer-list.vue'
import I18nL from '@/front/src/modules/i18n/i18n-l.vue'

export default defineComponent({
  components: { I18nL, IssuerList, CountryLabel },
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
