<template>
  <q-item-section>
    <q-item-label class="text-primary bg-elevation-1 q-pa-md">
      <span
        v-if="restriction && restriction.options.customInstructionTitle"
        v-html="restriction.options.customInstructionTitle"
      />
      <slot v-else name="title" />
    </q-item-label>
    <q-item-label class="text-primary-subtle q-pt-xs text-body2">
      <span
        v-if="restriction && restriction.options.customInstructionSubtitle"
        v-html="restriction.options.customInstructionSubtitle"
      />
      <slot v-else name="subtitle" />
    </q-item-label>
    <q-item-label caption class="text-primary-subtle"
      ><slot name="reason" />
    </q-item-label>
  </q-item-section>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

import { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'

export default defineComponent({
  props: {
    restriction: {
      type: Object as PropType<RestrictionNode>,
      required: true,
    },
  },
})
</script>
