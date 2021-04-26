<template>
  <q-input v-model="daysAgo" outlined dense type="number" label="Days ago" />
</template>

<script lang="ts">
import { createOptionSetup } from '@/admin/src/pages/edit/composables/use-tree'
import { Vaccinated } from '@/shared/src/restriction-tree/restriction-node/vaccinated'

export default createOptionSetup<typeof Vaccinated>({ daysAgo: 10 })
</script>
