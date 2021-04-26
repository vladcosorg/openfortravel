<template>
  <country-list v-model="allowedOrigins" :not.sync="not" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import CountryList from '@/admin/src/pages/edit/components/restriction-tree/country-list.vue'
import { getCompomentDefaults } from '@/admin/src/pages/edit/composables/use-tree'
import { Origin } from '@/shared/src/restriction-tree/restriction-node/origin'

export default defineComponent({
  components: { CountryList },
  ...getCompomentDefaults<typeof Origin>({ allowedOrigins: [], not: false }),
})
</script>
