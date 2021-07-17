<template>
  <component :is="wrapper" :restriction="restriction">
    <template #title
      >Acquire insurance that covers COVID-19 observation and treatment
    </template>
    <template #subtitle>
      <p>
        Upon arrival your are required to provide proof of health insurance that
        covers COVID-19 observation and treatment for the duration of your stay.
      </p>
    </template>
  </component>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'
import { Insurance } from '@/shared/src/restriction-tree/restriction-node/insurance'

export default defineComponent({
  mixins: [sharedProps],
  props: {
    restriction: {
      type: Object as PropType<Insurance>,
      required: true,
    },
  },
})
</script>
