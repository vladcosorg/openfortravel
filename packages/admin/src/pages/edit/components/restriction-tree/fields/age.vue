<template>
  <q-input
    v-model="age"
    style="width: 100px"
    standout=""
    dense
    type="number"
    label="Less than"
  />
</template>

<script lang="ts">
import { createOptionSetup } from '@/admin/src/pages/edit/composables/use-tree'
import { Age } from '@/shared/src/restriction-tree/restriction-node/age'

export default createOptionSetup<typeof Age>({ age: 12 })
</script>
