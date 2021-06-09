<template>
  <q-btn v-if="node.UID > 1" :icon="icon" unelevated @click="doAction"
    ><q-tooltip>Copy node</q-tooltip></q-btn
  >
</template>

<script lang="ts">
import { matFileCopy as icon } from '@quasar/extras/material-icons'
import { defineComponent, inject, PropType } from '@vue/composition-api'

import { QuasarTreeNode } from '@/admin/src/pages/edit/composables/use-tree'
import { TreeManagerStoreKey } from '@/admin/src/pages/edit/modules/symbols'

export default defineComponent({
  components: {},
  props: {
    node: {
      type: Object as PropType<QuasarTreeNode>,
      required: true,
    },
  },
  setup(props) {
    const treeManager = inject(TreeManagerStoreKey)
    const doAction = () => treeManager.copyNodeToBuffer(props.node)
    return {
      icon,
      doAction,
    }
  },
})
</script>
