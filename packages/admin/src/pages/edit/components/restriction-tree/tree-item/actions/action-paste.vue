<template>
  <q-btn v-if="show" :icon="icon" unelevated @click="doAction"
    ><q-tooltip>Paste node</q-tooltip></q-btn
  >
</template>

<script lang="ts">
import { matContentPaste as icon } from '@quasar/extras/material-icons'
import {
  computed,
  defineComponent,
  inject,
  PropType,
} from '@vue/composition-api'

import { QuasarLogicTreeNode } from '@/admin/src/pages/edit/composables/use-tree'
import { TreeManagerStoreKey } from '@/admin/src/pages/edit/modules/symbols'
import { TreeManager } from '@/admin/src/pages/edit/modules/tree-manager'
import { LogicNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: {},
  props: {
    node: {
      type: Object as PropType<QuasarLogicTreeNode>,
      required: true,
    },
  },
  setup(props) {
    const treeManager = inject(TreeManagerStoreKey) as TreeManager
    const show = computed(
      () =>
        treeManager.hasBuffer() &&
        Object.values(LogicNodeType).includes(props.node.type),
    )
    const doAction = () => treeManager.pasteNodeFromBuffer(props.node)
    return {
      show,
      icon,
      doAction,
    }
  },
})
</script>
