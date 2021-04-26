<template>
  <div class="row q-gutter-sm">
    <q-btn-toggle
      v-model="orMore"
      no-caps
      dense
      unelevated
      color="blue-grey-8"
      :options="[
        { label: 'Up to', value: false },
        { label: 'From', value: true },
      ]"
    />

    <q-input
      v-model="age"
      style="width: 100px"
      standout=""
      dense
      type="number"
      label="Limit"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { getCompomentDefaults } from '@/admin/src/pages/edit/composables/use-tree'
import { Age } from '@/shared/src/restriction-tree/restriction-node/age'

export default defineComponent({
  ...getCompomentDefaults<typeof Age>({ age: 12, orMore: false }),
})
</script>
