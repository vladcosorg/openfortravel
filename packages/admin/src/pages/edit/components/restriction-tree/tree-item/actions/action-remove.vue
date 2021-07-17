<template>
  <q-btn v-if="node.UID > 1" :icon="icon" unelevated @click="doAction"
    ><q-tooltip>Delete node</q-tooltip></q-btn
  >
</template>

<script lang="ts">
import { matRemove as icon } from '@quasar/extras/material-icons'
import { defineComponent, inject, PropType } from 'vue'

import { TreeManagerStoreKey } from '@/admin/src/pages/edit/modules/symbols'
import { TreeBuilderNode } from '@/admin/src/pages/edit/types'

export default defineComponent({
  components: {},
  props: {
    node: {
      type: Object as PropType<TreeBuilderNode>,
      required: true,
    },
  },
  setup(props) {
    const treeManager = inject(TreeManagerStoreKey)
    const doAction = () => treeManager.removeNode(props.node)
    return {
      icon,
      doAction,
    }
  },
})
</script>
