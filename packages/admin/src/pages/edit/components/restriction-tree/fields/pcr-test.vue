<template>
  <q-input
    v-model="hours"
    style="width: 100px"
    standout=""
    dense
    type="number"
    label="Hours"
  />
</template>

<script lang="ts">
import { createOptionSetup } from '@/admin/src/pages/edit/composables/use-tree'
import { PcrTest } from '@/shared/src/restriction-tree/restriction-node/pcr-test'

export default createOptionSetup<typeof PcrTest>({ hours: 72 })
</script>
