<template v-for="index in 5" :key="index">
  <q-item>
    <q-item-section>
      <q-item-label caption>
        <q-skeleton type="text" width="20%" />
      </q-item-label>
      <q-item-label>
        <q-skeleton type="text" width="40%" />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>
