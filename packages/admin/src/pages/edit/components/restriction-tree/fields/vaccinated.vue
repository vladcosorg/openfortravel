<template>
  <div class="row q-col-gutter-sm">
    <q-input
      v-model="daysAgo"
      outlined
      dense
      type="number"
      label="At least days ago"
    />
    <vaccine-brand-list v-model="authorizedBrands" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import VaccineBrandList from '@/admin/src/pages/edit/components/restriction-tree/vaccine-brand-list.vue'
import { getCompomentDefaults } from '@/admin/src/pages/edit/composables/use-tree'
import { Vaccinated } from '@/shared/src/restriction-tree/restriction-node/vaccinated'

export default defineComponent({
  components: { VaccineBrandList },

  ...getCompomentDefaults<typeof Vaccinated>({
    daysAgo: 10,
    authorizedBrands: [],
  }),
})
</script>
