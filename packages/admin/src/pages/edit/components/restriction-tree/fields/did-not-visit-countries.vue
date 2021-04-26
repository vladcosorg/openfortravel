<template>
  <div class="row q-col-gutter-sm">
    <country-list v-model="countryCodes" />
    <q-input v-model="days" outlined dense type="number" label="Days" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import CountryList from '@/admin/src/pages/edit/components/restriction-tree/country-list.vue'
import { getCompomentDefaults } from '@/admin/src/pages/edit/composables/use-tree'
import { DidNotVisitCountries } from '@/shared/src/restriction-tree/restriction-node/did-not-visit-countries'

export default defineComponent({
  components: { CountryList },
  ...getCompomentDefaults<typeof DidNotVisitCountries>({
    countryCodes: [],
    days: 10,
  }),
})
</script>
