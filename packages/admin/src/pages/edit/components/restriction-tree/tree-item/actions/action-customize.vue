<template>
  <q-btn v-if="show" :icon="icon" unelevated @click="doAction" />
</template>

<script lang="ts">
import { matToggleOn as icon } from '@quasar/extras/material-icons'
import {
  computed,
  defineComponent,
  inject,
  PropType,
} from '@vue/composition-api'

import { QuasarTreeNode } from '@/admin/src/pages/edit/composables/use-tree'
import { TreeManagerStoreKey } from '@/admin/src/pages/edit/modules/tree-manager'
import { LogicNodeType } from '@/shared/src/restriction-tree/types'

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
    const doAction = () => treeManager.toggleCustom(props.node)
    const show = computed(
      () => !Object.values(LogicNodeType).includes(props.node.type),
    )
    return {
      icon,
      doAction,
      show,
    }
  },
})
</script>
