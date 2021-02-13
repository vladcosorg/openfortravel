<template>
  <div
    class="bg-elevation-1 overflow-auto q-pb-lg q-pt-md q-mb-xl relative-position"
  >
    <div class="container">
      <the-country-list
        :origin-code="originCode"
        :destination-code="destinationCode"
        show-destination-if-empty
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import TheCountryList from '@/front/src/layouts/components/the-country-list/the-country-list.vue'

export default defineComponent({
  components: { TheCountryList },
  props: {
    originCode: {
      type: String,
      default: undefined,
    },
    destinationCode: {
      type: String,
      required: false,
      default: undefined,
    },
  },
})
</script>
