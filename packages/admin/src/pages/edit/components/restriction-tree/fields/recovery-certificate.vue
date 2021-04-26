<template>
  <div class="row q-col-gutter-sm">
    <q-input
      v-model="daysAtLeast"
      outlined
      dense
      type="number"
      label="Days at least"
    />
    <q-input
      v-model="daysAtMost"
      outlined
      dense
      type="number"
      label="Days at most"
    />
  </div>
</template>

<script lang="ts">
import { createOptionSetup } from '@/admin/src/pages/edit/composables/use-tree'
import { RecoveryCertificate } from '@/shared/src/restriction-tree/restriction-node/recovery-certificate'

export default createOptionSetup<typeof RecoveryCertificate>({
  daysAtLeast: 14,
  daysAtMost: 90,
})
</script>
