<template>
  <q-input v-model="url" outlined standout="" dense type="url" label="URL" />
</template>

<script lang="ts">
import { createOptionSetup } from '@/admin/src/pages/edit/composables/use-tree'
import { OnlineApplication } from '@/shared/src/restriction-tree/restriction-node/online-application'

export default createOptionSetup<typeof OnlineApplication>({ url: '' })
</script>
