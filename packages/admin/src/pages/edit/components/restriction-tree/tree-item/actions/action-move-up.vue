<template>
  <q-btn v-if="node.UID > 1" :icon="icon" unelevated @click="doAction">
    <q-tooltip>Move up</q-tooltip>
  </q-btn>
</template>

<script lang="ts">
import { matArrowUpward as icon } from '@quasar/extras/material-icons'
import { defineComponent, inject, PropType } from '@vue/composition-api'

import { QuasarTreeNode } from '@/admin/src/pages/edit/composables/use-tree'
import { TreeManagerStoreKey } from '@/admin/src/pages/edit/modules/tree-manager'

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
    const doAction = () => treeManager.moveNodeUp(props.node)
    return {
      icon,
      doAction,
    }
  },
})
</script>
