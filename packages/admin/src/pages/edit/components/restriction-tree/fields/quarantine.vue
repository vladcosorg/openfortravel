<template>
  <div class="row q-col-gutter-sm">
    <q-input v-model="days" outlined dense type="number" label="Days" />
    <q-input
      v-model="earlyReleaseDays"
      outlined
      dense
      type="number"
      label="Early release days"
    />
  </div>
</template>

<script lang="ts">
import { createOptionSetup } from '@/admin/src/pages/edit/composables/use-tree'
import { Quarantine } from '@/shared/src/restriction-tree/restriction-node/quarantine'

export default createOptionSetup<typeof Quarantine>({
  days: 14,
  earlyReleaseDays: 0,
})
</script>
