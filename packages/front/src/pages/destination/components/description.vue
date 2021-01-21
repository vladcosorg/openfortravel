<template>
  <div v-if="loading" class="text-subtitle1 column flex-center">
    <q-skeleton type="text" width="100%" />
    <q-skeleton type="text" width="70%" />
    <q-skeleton type="text" width="95%" />
  </div>
  <div v-else v-html="restriction.description" />
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

import { Restriction } from '@/shared/src/api/restrictions/models'

export default defineComponent({
  components: {},
  props: {
    restriction: {
      type: Object as PropType<Restriction>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
})
</script>
