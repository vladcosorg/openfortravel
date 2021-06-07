<template>
  <q-btn
    v-if="show"
    :icon="!label ? icon : undefined"
    :label="label"
    unelevated
    @click="doAction"
  />
</template>

<script lang="ts">
import { matAdd as icon } from '@quasar/extras/material-icons'
import {
  computed,
  defineComponent,
  inject,
  PropType,
} from '@vue/composition-api'

import { QuasarTreeNode } from '@/admin/src/pages/edit/composables/use-tree'
import { TreeManagerStoreKey } from '@/admin/src/pages/edit/modules/tree-manager'
import {
  LogicNodeType,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: {},
  props: {
    node: {
      type: Object as PropType<QuasarTreeNode>,
      required: true,
    },
    type: {
      type: String as PropType<LogicNodeType | RestrictionNodeType>,
    },
    label: {
      type: String,
    },
  },
  setup(props) {
    const show = computed(() =>
      Object.values(LogicNodeType).includes(props.node.type),
    )
    const treeManager = inject(TreeManagerStoreKey)
    const doAction = () => treeManager.addNodeToParent(props.node, props.type)
    return {
      icon,
      show,
      doAction,
    }
  },
})
</script>
