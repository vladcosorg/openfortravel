<template>
  <q-btn v-if="show" label="Add title" unelevated @click="doAction" />
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType } from 'vue'
import Vue from 'vue'

import { EventBus } from '@/admin/src/pages/edit/modules/symbols'
import { TreeBuilderRestrictionNode } from '@/admin/src/pages/edit/types'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  props: {
    node: {
      type: Object as PropType<TreeBuilderRestrictionNode>,
      required: true,
    },
  },
  setup(props) {
    const eventBus = inject(EventBus) as Vue

    const show = computed(
      () =>
        props.node.type !== RestrictionNodeType.CUSTOM_REQUIREMENT &&
        Object.values(RestrictionNodeType).includes(props.node.type) &&
        !props.node.options.customInstructionTitle?.length,
    )

    const doAction = () => {
      eventBus.$emit(`show-title-${props.node.UID}`)
    }

    return {
      show,
      doAction,
    }
  },
})
</script>
