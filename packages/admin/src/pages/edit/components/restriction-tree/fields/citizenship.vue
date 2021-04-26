<template>
  <country-list v-model="allowedCitizenship" :not.sync="not" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import CountryList from '@/admin/src/pages/edit/components/restriction-tree/country-list.vue'
import { getCompomentDefaults } from '@/admin/src/pages/edit/composables/use-tree'
import { Citizenship } from '@/shared/src/restriction-tree/restriction-node/citizenship'

export default defineComponent({
  components: { CountryList },
  ...getCompomentDefaults<typeof Citizenship>({
    allowedCitizenship: [],
    not: false,
  }),
})
</script>
